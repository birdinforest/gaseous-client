// src/pages/GameDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRoms } from '@app/store/slices/romSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { getGameById } from '@app/api/game.api';
import { GameMeta } from '@app/types/generalTypes';

const GameDetailsPage = () => {
  const { gameId } = useParams();
  const dispatch = useAppDispatch();
  const roms = useAppSelector((state) => state.roms.roms);
  const status = useAppSelector((state) => state.games.status);
  const error = useAppSelector((state) => state.games.error);

  const [gameMeta, setGameMeta] = useState<GameMeta | undefined>(undefined);

  useEffect(() => {
    if (gameId) {
      dispatch(fetchRoms({ gameId: parseInt(gameId, 10), pageNumber: 1, pageSize: 30 }));
      getGameById(parseInt(gameId, 10)).then((res) => setGameMeta(res));
    }
  }, [dispatch, gameId]);

  if (status === 'loading') {
    return <div>Loading ROMs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>
        ROMs for Game: {gameMeta?.name}, Id: {gameId}
      </h1>
      <ul>
        {roms.map((rom) => (
          <li key={rom.id}>{rom.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameDetailsPage;
