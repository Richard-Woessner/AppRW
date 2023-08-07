import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { PostView } from '../../src/components/postView/PostView';
import { gameService } from '../../services/gameServices';
import { useEffect, useState } from 'react';
import { Game } from '../../services/gameServices';

import { getRandomInt } from '../../src/helpers/func';
import { FlatList } from 'react-native-gesture-handler';
import { setDeviceDimensions } from '../../redux/slices/generalSlice';
import { GeneralState, Post } from '../../src/models/models';

export interface HomeProps {
  generalState: GeneralState;
  setGeneralState: (generalState: GeneralState) => void;
}

export const Home = (props: HomeProps) => {
  const { generalState, setGeneralState } = props;
  const { posts } = generalState;
  const count = useSelector((state: RootState) => state.home.value);
  const dispatch = useDispatch();

  const [games, setGames] = useState([]);

  const getGames = async () => {
    return await gameService.getGames();
  };

  const closeMenu = () => {
    setGeneralState({
      ...generalState,
      menuOpen: false,
    });
  };

  useEffect(() => {
    console.log('Home useEffect');

    getGames().then((games) => {
      const quickData = games.map((game) => {
        let uuid = Math.random().toString(36).substring(7);
        return { ...game, listId: uuid };
      });

      setGames(quickData);
    });
  }, []);

  const CustPostView = (post: any) => {
    const p = post.item as Post;

    return (
      <PostView
        user={p.user}
        title={p.title}
        body={p.body}
        rating={p.rating}
        game={p.game}
        key={p.postId}
      />
    );
  };

  if (generalState.menuOpen) {
    <Pressable onPress={closeMenu} style={{ maxHeight: '100%', maxWidth: '100%' }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <CustPostView item={item} />}
        keyExtractor={(item) => item.postId}
        nestedScrollEnabled
      />
    </Pressable>;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <CustPostView item={item} />}
      keyExtractor={(item) => item.postId}
      nestedScrollEnabled
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    height: '100%',
  },
  scrollable: {
    maxHeight: '92%',
  },
  bottom: {
    width: '100%',
    height: '8%',
    position: 'absolute',
  },
});
