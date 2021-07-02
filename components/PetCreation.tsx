import { useState, useEffect } from "react";
import { APIRequest } from "../services/APIRequest";
import { PetType, SetPet } from "../src/pet";
import paths from "../utils/Paths";
import axios from "axios";
import { Formik, Form } from "formik";
import _ from "lodash"
import clsx from "clsx";
import { APIImagePath } from "../services/Helpers";
import Input from "./Input";
import { PetBackgroundQuestionType } from "../src/pet/background/question";
import { petSchema } from "../services/ValidationService";
import SelectInput from "./SelectInput"
import Button from "./Button";
import { useTranslation } from "react-i18next";
import FormErrors from "./FormErrors";
import { usePet } from "../services/PetContext";

const PetCreation = () => {
  const { t } = useTranslation();
  const [pet, petDispatch] = usePet()
  const [pets, setPets] = useState<PetType[] | []>([])
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState<PetType | null>(null)
  const [questions, setQuestions] = useState<PetBackgroundQuestionType[] | []>([])
  const [selectedPetImage, setSelectedPetImage] = useState<string>("")
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    gender: "M"
  })

  const fetchData = () => {
    const getPets = APIRequest(paths.pets)
    const getQuestions = APIRequest(paths.petsBackgroundQuestions)

    axios.all([getPets, getQuestions]).then(
      axios.spread((...allData) => {
        const petsData = allData[0].data.data;
        const questionsData = allData[1].data.data;

        const selectedPet = petsData[0]
        const selectedPetURI = selectedPet.attributes.images_url[0].path;
        setPets(petsData)
        setQuestions(questionsData)
        setSelectedPet(selectedPet)
        setSelectedPetImage(APIImagePath(selectedPetURI))

        const questionObj = questionsData.map((question: PetBackgroundQuestionType) => ({
          question_id: question.id,
          answer_id: question.attributes.answers[0].id
        }))

        setInitialValues({
          ...initialValues,
          pet_id: selectedPet.id,
          backgrounds_attributes: questionObj,
          pet_image_uri: APIImagePath(selectedPetURI)
        })
        setLoading(false)
      })
    )
  }

  const mapAnswers = (answers) =>
    answers.map((answer) => ({ key: answer.answer, value: answer.id }))

  const updateSelectedPet = (pet: PetType, values: any) => {
    setSelectedPet(pet);
    updateSelectedPetChoice(pet.attributes.images_url[0].path, values)
    values.pept_id = pet.id
  }

  const updateSelectedPetChoice = (path: string, values: any) => {
    setSelectedPetImage(APIImagePath(path));
    values.pet_image_uri = APIImagePath(path)
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={petSchema}
        onSubmit={(
          values,
          {
            setSubmitting,
            setFieldError,
            setStatus,
          }
        ) => {
          APIRequest(paths.createUserPet, "post", { user_pet: values })
            .then((res) => {
              if (res.status === 200) {
                const { data } = res.data
                petDispatch(SetPet(data))
              }
            })
            .catch((err) => {
              if (err.response.status === 422) {
                const { error } = err.response.data;
                for (const [key, value] of Object.entries(error)) {
                  setFieldError(key, `${_.upperFirst(key)} ${value}`)
                }
                setSubmitting(false)
              } else {
                setStatus(t("forms.errors.server_error"))
              }
              setSubmitting(false)
            })
        }
        }
      >
        {({ values, errors, touched, status, isSubmitting, isValid, dirty }) => (
          <>
            <Form>
              <FormErrors
                status={status}
                errors={errors}
                touched={touched}
              />
              <div className="grid md:grid-flow-col px-4 pt-20 space-x-4 space-y-4">
                <div
                  style={{ height: "457px" }}
                  className="p-4 bg-blue-100 rounded-lg overflow-y-auto no-scrollbar">
                  {_.chunk(pets, 3).map((chunk, index) => (
                    <div
                      key={index}
                      className="flex flex-row p-2 justify-between"
                    >
                      {chunk.map((pet) => (
                        <img
                          key={pet.id}
                          className={clsx(
                            "h-24",
                            selectedPet === pet ? "border-lg border-4 rounded-lg border-white shadow" : ""
                          )}
                          src={APIImagePath(pet?.attributes?.images_url[0]?.path)}
                          onClick={() => updateSelectedPet(pet, values)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center items-center pt-12">
                    <img className="h-24" src={selectedPetImage} />
                  </div>
                  <div className="justify-center flex items-center space-x-2">
                    {selectedPet?.attributes.images_url.map((image) => (
                      <img
                        key={image.name}
                        className="h-6"
                        src={APIImagePath(image.path)}
                        onClick={() => updateSelectedPetChoice(image.path, values)}
                      />
                    ))}
                  </div>
                  <div className="flex items-center bg-blue-100 p-2 space-x-4">
                    <div className="w-full">
                      <Input type="text" name="name" label="Name" />
                    </div>
                    <div className="my-4 w-full">
                      <SelectInput
                        name="gender"
                        label="Gender"
                        options={[
                          { key: "Male", value: "M" },
                          { key: "Female", value: "F" }
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg">
                  {questions.map((question: PetBackgroundQuestionType, index: number) => (
                    <SelectInput
                      key={question.id}
                      name={`backgrounds_attributes.${index}.answer_id`}
                      label={question.attributes.question}
                      options={mapAnswers(question.attributes.answers)}
                    />
                  ))}
                  <Button
                    type="submit"
                    wide={true}
                    disabled={isSubmitting || !isValid || !dirty}
                    label="Create"
                  />
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default PetCreation;
