import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { PostView } from '../../src/components/postView/PostView';
import { gameService } from '../../src/services/gameServices';
import { useState } from 'react';
import { DisplayAlert } from '../../src/helpers/func';
import { FlatList } from 'react-native-gesture-handler';
import { GeneralState, Post, User } from '../../src/models/models';
import { Icon, Input, Slider, Tab, TabView } from '@rneui/themed';
import { useKeyboardVisible } from '../../src/hooks/useKeyboard';
import { Button } from '../../src/components/button/button';
import { PostsContextType, UsePost } from '../../src/providers/postProvider';
import { UseAuth } from '../../src/providers/authProvider';

export interface HomeProps {
  generalState: GeneralState;
  setGeneralState: (generalState: GeneralState) => void;
  postProvider: PostsContextType;
}

export const Home = (props: HomeProps) => {
  const postProvider = UsePost();
  const authProvider = UseAuth();
  const { user } = authProvider;
  const { generalState, setGeneralState } = props;
  const { posts } = postProvider;
  const [index, setIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [postForm, setPostForm] = useState<Post>({
    title: '',
    body: '',
    rating: 0,
    game: '',
    user: '',
    date: undefined,
  });

  const interpolate = (start: number, end: number) => {
    let k = (sliderValue - 0) / 5; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  const post = async () => {
    const post: Post = {
      title: postForm.title,
      body: postForm.body,
      rating: sliderValue,
      game: postForm.game,
      user: user.email || '',
      date: new Date(),
    };

    postProvider.createPost(post).then((res) => {
      DisplayAlert({ title: 'Post created' });
      console.log(res);
      setIndex(0);
    });
  };

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

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item title="Home" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Post" titleStyle={{ fontSize: 12 }} />
      </Tab>

      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        containerStyle={{ height: '100%', borderWidth: 1 }}
      >
        <TabView.Item style={{ width: '100%' }}>
          <View style={styles.container}>
            <FlatList
              data={posts.sort((a, b) => b.sortDate - a.sortDate)}
              renderItem={({ item }) => <CustPostView item={item} />}
              keyExtractor={(item) => item.postId}
              refreshing={true}
              onRefresh={() => generalState.getData()}
            />
          </View>
        </TabView.Item>

        <TabView.Item style={{ width: '100%' }}>
          <View style={styles.postContainer}>
            <Input
              style={styles.input}
              placeholder="Title"
              value={postForm.title}
              onChangeText={(text) => setPostForm({ ...postForm, title: text })}
            />
            <Input
              style={styles.input}
              placeholder="Game"
              value={postForm.game}
              onChangeText={(text) => setPostForm({ ...postForm, game: text })}
            />
            <View style={{ paddingHorizontal: 20 }}>
              <Slider
                value={sliderValue}
                onValueChange={(e) => setSliderValue(e)}
                maximumValue={8}
                minimumValue={1}
                step={1}
                allowTouchTrack
                trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                thumbProps={{
                  children: (
                    <Icon
                      name="heartbeat"
                      type="font-awesome"
                      size={20}
                      reverse
                      containerStyle={{ bottom: 20, right: 20 }}
                      color={color()}
                    />
                  ),
                }}
              />
            </View>
            <Input
              placeholder="Body"
              multiline={true}
              numberOfLines={10}
              style={{ height: 200, textAlignVertical: 'top', fontSize: 11 }}
              value={postForm.body}
              onChangeText={(text) => setPostForm({ ...postForm, body: text })}
            />
            <Button title="Post" type="solid" onPress={post} />
          </View>
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  postContainer: {
    padding: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
  input: {
    width: '100%',
  },
});
