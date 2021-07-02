import React, { useEffect, useState } from "react";
import { useCable } from "../services/ActionCableContext";
import { APIRequest } from "../services/APIRequest";
import { useAuth } from "../services/AuthStateContext";
import { UserPetType } from "../src/user/pet";
import { SetUserPetBattle, useUserPetBattle } from "../src/user/pet/battle";
import paths from "../utils/Paths";
import Card from "./battles/Card";
import Heading from "./Heading";

interface BattleProps {
  id: string | string[] | undefined
}

const Battle = ({ id }: BattleProps) => {
  // @ts-ignore: Fix this!!
  const [battleData, battleDataDispatch] = useUserPetBattle()
  // @ts-ignore: Fix this!!
  const [cable, cableDispatch] = useCable();
  // @ts-ignore: Fix this!!
  const [user, userDispatch] = useAuth();
  const [spectators, setSpectators] = useState<UserPetType[]>([]);
  // @ts-ignore: Fix this!!
  const [challenger, setChallenger] = useState<UserPetType>(null);
  // @ts-ignore: Fix this!!
  const [opponent, setOpponent] = useState<UserPetType>(null);
  const [subscription, setSubscription] = useState(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [petTurn, setPetTurn] = useState<UserPetType>();
  const [combatLog, setCombatLog] = useState<any[]>([])
  const [channelData, setChannelData] = useState({});

  useEffect(() => {
    if (challenger === null || opponent === null) return;

    if (challenger.attributes.health <= 0 || opponent.attributes.health <= 0) {
      setGameOver(true);
    }

  }, [challenger, opponent])

  useEffect(() => {
    if (!cable?.subscriptions || !user['id'] || challenger === null) {
      return;
    }

    const sub = cable.subscriptions.create(
      { channel: "BattleChannel", battle_id: id },
      {
        received: (message: any) => {
          if (message.action === "Update Pet") {
            setChannelData(message)
          }
        }
      }
    )

    if (subscription === null) {
      setSubscription(sub)
    }

  }, [cable, user, id, challenger, opponent, subscription])

  useEffect(() => {
    // @ts-ignore: Fix this!!
    if (channelData['action'] === undefined) return;

    // @ts-ignore: Fix this!!
    const { data } = channelData.data
    // @ts-ignore: Fix this!!
    const { combat } = channelData
    setCombatLog(prevState => [combat, ...prevState])

    if (data.id == challenger.id) {
      setChallenger(data)
      setPetTurn(data)
    } else {
      setOpponent(data)
      setPetTurn(data)
    }

  }, [channelData])

  useEffect(() => {
    if (id === undefined) return;

    // @ts-ignore: Fix this!
    APIRequest(paths.userPetBattle(id))
      .then((res) => {
        if (res.status === 200) {
          const { data } = res
          const challenger_id = data.data.attributes.challenger_id
          const opponent_id = data.data.attributes.opponent_id
          // @ts-ignore: Fix this!
          const challenger = data.included.find((d) => d.id == challenger_id)
          // @ts-ignore: Fix this!
          const opponent = data.included.find((d) => d.id == opponent_id)
          setChallenger(challenger)
          setOpponent(opponent)
          setPetTurn(opponent)
          battleDataDispatch(SetUserPetBattle(data))
        }
      })
  }, [id])

  if (battleData.isLoading) {
    return (
      <div>Loading some data!!!!</div>
    )
  }

  if (gameOver) {
    return (
      <div>someone fkn died</div>
    )
  }

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <div className="space-x-14">
          <Card pet={opponent} petTurn={petTurn} opponent={challenger} subscription={subscription} />
          <Card pet={challenger} petTurn={petTurn} opponent={opponent} subscription={subscription} />
        </div>
      </div>
      <div>
        <div>
          <Heading type="h1" text="Combat log" />
          {combatLog.map((combat) => <p key={combat.data.id}>{combat.data.attributes.combat_message}</p>)}
        </div>
        <div>
          <Heading type="h3" text="Spectators" />
        </div>
      </div>
    </div>
  )
}

export default Battle;
