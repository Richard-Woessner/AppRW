import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { PostView } from '../../src/components/postView/PostView';
import { gameService } from '../../services/gameServices';
import { useEffect, useState } from 'react';
import { Game } from '../../services/gameServices';

import { getRandomInt } from '../../src/helpers/func';

export const Home = () => {
  const count = useSelector((state: RootState) => state.home.value);
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);

  const getGames = async () => {
    return await gameService.getGames();
  };

  useEffect(() => {
    getGames().then((games) => {
      const quickData = games.map((game) => {
        let uuid = Math.random().toString(36).substring(7);
        return { ...game, listId: uuid };
      });

      setGames(quickData);
    });
  }, []);

  const CustPostView = (item: any) => {
    console.log(item);

    return (
      <PostView
        user={'username'}
        title={'Title'}
        body={'asdfasdfasdf'}
        rating={getRandomInt(4) + 1}
        game={item.name}
        key={item.listId}
      />
    );
  };

  return (
    <>
      <FlatList
        data={games}
        renderItem={({ item }) => <CustPostView item={item} />}
        keyExtractor={(item) => item.listId}
      />
    </>
  );
};
