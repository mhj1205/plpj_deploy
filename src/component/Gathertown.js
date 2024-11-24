import { useEffect, useState } from "react";
import { Game, Engine,MoveDirectionEnum_ENUM  } from "@gathertown/gather-game-client";
import "../css/Gathertown.css";

const { SPACE_ID, API_KEY1,API_KEY2 } = require("../confing"); // Gather 공간 ID와 API 키를 가져옵니다.

const Gathertown = ({ getMap, getUsers, getUser }) => {
  const [mapData, setMapData] = useState(null);
  const [userEvents, setUserEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userGame,setUserGame] = useState({});

  const TILE_SIZE = 32;

  useEffect(() => {
    //Game게임 초기화 / 맵,유저이벤트 업데이트
    const game = newGame(API_KEY1)
    initGameConnection(game,"박지훈");
    return () => {
      try {
        game.disconnect();
        console.log("컴포넌트 언마운트 시 Gather 공간 연결 해제");
      } catch (err) {
        console.error("연결 해제 중 오류 발생:", err);
      }
    };
  }, []);

  //로딩페이지 표시
  if (loading) {
    return (
      <div className="loading-modal">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  //에러발생시 화면에 에러 표시
  if (error) {
    return <div className="error-modal">{error}</div>;
  }

  return (
    <div className="map-container">
      <div
        className="background"
        style={{
          backgroundImage: `url(${mapData.backgroundImagePath})`,
          width: mapData.dimensions[0] * TILE_SIZE,
          height: mapData.dimensions[1] * TILE_SIZE,
          margin: "0 auto",
        }}
      >
        {mapData.spawns.map((spawn, index) => (
          <div
            key={index}
            className="spawn-point"
            style={{
              left: spawn.x * TILE_SIZE,
              top: spawn.y * TILE_SIZE,
            }}
          />
        ))}

        {/*맵에있는 오브잭트 표시*/}
        {Object.keys(mapData.objects).map((key) => {
          const obj = mapData.objects[key];
          return (
            <img
              key={obj.id}
              src={obj.normal}
              alt={obj._name}
              className="map-object"
              style={{
                left: obj.x * TILE_SIZE,
                top: obj.y * TILE_SIZE,
                zIndex: obj.zIndex,
              }}
            />
          );
        })}

        {Object.values(mapData.nooks).map((nook, index) => (
          <div key={index} className="nook-area">
            {nook.nookCoords.coords.map((coord, coordIndex) => (
              <div
                key={coordIndex}
                className="nook-point"
                style={{
                  left: coord.x * TILE_SIZE,
                  top: coord.y * TILE_SIZE,
                }}
              />
            ))}
          </div>
        ))}

        {/*플레이어 표시*/}
        {Object.keys(userEvents).map((userId) => {
          const user = userEvents[userId];
          const x = user.x !== undefined ? user.x * TILE_SIZE : 0;
          const y = user.y !== undefined ? user.y * TILE_SIZE : 0;

          return (
            <div
              key={userId}
              className="user-circle"
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "red",
                transform: "translate(-50%, -50%)" 
              }}
            />
          );
        })}
        
      </div>

      <div className="user-info">
        <h3>모든 플레이어 정보</h3>
        {Object.keys(userEvents).map((userId) => {
          const user = userEvents[userId];
          const x = user.x !== undefined ? user.x : "N/A";
          const y = user.y !== undefined ? user.y : "N/A";
          return (
            <div key={userId} className="individual-user-info">
              <p>유저이름: {user.name}</p>
              <p>유저 ID: {userId}</p>
              <p>위치: {x}, {y}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  //화살표 함수 함수는 함수선언부 이전에 접근하면 ReferenceError 가 발생함
  //그래서 일반 함수를 사용해서 정리함

  function newGame (API_KEY1){
    const game = new Game(
      SPACE_ID,
      () => Promise.resolve({ apiKey: API_KEY1 }),
      (dir, stopped, inputId, txnPromise) => {
        console.log(`Direction: ${dir}, Stopped: ${stopped}, Input ID: ${inputId}`);
      },
      (delta) => {
        //룸에 있는 유저 업데이트 정보 실시간 관리
        setUserEvents((prevUserEvents) => {
          const updatedEvents = { ...prevUserEvents };
          Object.keys(delta).forEach((userId) => {
            updatedEvents[userId] = {
              ...updatedEvents[userId],
              ...delta[userId]
            };
          });
          return updatedEvents;
        });
        console.log("Game Update:", delta);
      },
      //맵 정보 업데이트 실시간 정보 관리
      (mapId, map) => {setMapData(map);console.log("Map Update:", mapId, map); },
      (name, data) => console.log(`Metric: ${name}`, data)
    );
  
    return game
  }

  async function initGameConnection(game,name){
    try {
      //Gathertown 서버연결/ 캐릭터 입장
      await game.connect();
      await game.enter({name:name});
      
      // 모든 초기 상태 동기화가 완료될 때까지 대기
      await game.waitForInit();
      console.log("초기화 완료, 모든 맵 데이터와 플레이어 정보 로드됨");

    } catch (error) {
      console.error("Connection error:", error);
      setError("Gather 공간에 연결하는 중 문제가 발생했습니다.");
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  async function userMove(game){
    await game.waitForInit();
    game.move(MoveDirectionEnum_ENUM.Down)
    game.move(MoveDirectionEnum_ENUM.Down)
    game.move(MoveDirectionEnum_ENUM.Down)
    game.move(MoveDirectionEnum_ENUM.Up)
    game.move(MoveDirectionEnum_ENUM.Up)
  }

};

export default Gathertown;

