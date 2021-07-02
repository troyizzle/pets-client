const paths = {
  signup: "api/signup",
  whoami: "api/whoami",
  login: "api/login",
  myNotifications: "api/user/notifications/me",
  myPet: "api/user/pets/me",
  pets: "api/pets",
  createUserPet: "api/user/pets",
  userPets: "api/user/pets",
  createUserPetBattle: "api/user/pet/battles",
  userPetBattle: (id: string): string => `api/user/pet/battles/${id}`,
  petsBackgroundQuestions: "api/pets/background/questions",
  meReadNotification: (id: string): string =>
    `api/user/notifications/${id}/read`,
  meUnreadNotification: (id: string): string =>
    `api/user/notifications/${id}/unread`,
  meDeleteNotification: (id: string): string =>
    `api/user/notifications/${id}/delete`
}

export default paths;
