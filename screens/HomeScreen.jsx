import React from 'react'
import { 
  View, 
  FlatList, 
  Text, 
  Button, 
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const DATA = [
    {
      id: '1',
      title: 'First Item'
    },
    {
      id: '2',
      title: 'Second Item'
    },
    {
      id: '3',
      title: 'Third Item'
    },
    {
      id: '4',
      title: 'Fourth Item'
    },
    {
      id: '5',
      title: 'Fifth Item'
    },
    {
      id: '6',
      title: 'Sixth Item'
    },
    {
      id: '7',
      title: 'Seventh Item'
    },
    {
      id: '8',
      title: 'Eigth Item'
    },
    {
      id: '9',
      title: 'Ninth Item'
    },
    {
      id: '10',
      title: 'Tenth Item'
    },
  ]

  function goToProfile() {
    navigation.navigate('Profile Screen')
  }

  function goToSingleTweet() {
    navigation.navigate('Tweet Screen')
  }
  
  function goToNewTweet() {
    navigation.navigate('New Tweet')
  }
  const renderItem = ({item}) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToProfile()}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.flexRow} onPress={() => goToSingleTweet()}>
          <Text numberOfLines={1} style={styles.tweetName}>{item.title}</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>@kings</Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>9min</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tweetContentContainer} onPress={() => goToSingleTweet()}>
          <Text style={styles.tweetContent}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis praesentium iusto corrupti quam repellendus odit cumque eligendi, iure quasi cupiditate?
          </Text>
        </TouchableOpacity>
        <View style={styles.tweetEngagment}>
          <TouchableOpacity style={[styles.flexRow]}>
            <EvilIcons 
              name="comment" 
              size={22} 
              color="gray" 
              style={{ marginRight: 2 }} />
            <Text style={styles.textGray}>456</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons 
              name="retweet" 
              size={22} 
              color="gray" 
              style={{ marginRight: 2 }} />
            <Text style={styles.textGray}>46</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons 
              name="heart" 
              size={22} 
              color="gray" 
              style={{ marginRight: 2 }} />
            <Text style={styles.textGray}>1,234</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons 
              name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'} 
              size={22} 
              color="gray" 
              style={{ marginRight: 2 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
  return (
    <View style={styles.container}>
      <FlatList 
        data={DATA} 
        renderItem={renderItem} 
        keyExtractor={item => item.id} 
        ItemSeparatorComponent={() => <View style={styles.tweetSeparator}></View>}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => goToNewTweet()}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
  textGray: {
    color: 'gray'
  },  
  flexRow: {
    flexDirection: 'row'
  },
  tweetContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tweetSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 12,
    borderRadius: 21
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222'
  },
  tweetHandle: {
    marginHorizontal: 8,
    color: 'gray'
  },
  tweetContentContainer: {
    marginTop: 4,
  },
  tweetContent: {
    lineHeight: 20,
  },
  tweetEngagment: {
    flexDirection: 'row'
  },
  ml4: {
    marginLeft: 24
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d9bf1',
    position: 'absolute',
    bottom: 20,
    right: 12
  },
})
