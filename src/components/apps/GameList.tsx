// src/components/apps/GameList.js
import React from 'react';
import { BaseList } from '@app/components/common/BaseList/BaseList';
import { HashLink } from 'react-router-hash-link';
import * as S from './GameList.styles';
import { Game } from '@app/types/generalTypes'; // Assume similar styling as DashboardPage

type Props = {
  games: Game[];
};

const GameList = ({ games }: Props) => {
  return (
    <BaseList
      key={`games-list`}
      itemLayout="horizontal"
      header={`Games`}
      dataSource={games}
      renderItem={(game) => (
        <HashLink to={`/games/${game.id}`}>
          <BaseList.Item>
            <S.Text>{game.name}</S.Text>
          </BaseList.Item>
        </HashLink>
      )}
    />
  );
};

export default GameList;
