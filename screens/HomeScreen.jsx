import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import formatDistance from "../helpers/formatDateDistance";
import locale from "date-fns/locale/en-US";

export default function HomeScreen({ navigation }) {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);

  useEffect(() => {
    getAllTweets();
  }, [page]);

  function getAllTweets() {
    axios
      .get(`http://10.0.2.2:8000/api/tweets?page=${page}`)
      // .get(`https://4639-41-212-47-54.eu.ngrok.io/api/tweets?page=${page}`)
      .then(response => {
        if (page === 1) {
          setTweets(response.data.data);
        } else {
          setTweets([...tweets, ...response.data.data]);
        }

        if (!response.data.next_page_url) {
          setIsAtEndOfScrolling(true);
        }
        
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }

  function handleRefresh() {
    setPage(1)
    setIsAtEndOfScrolling(false)
    setIsRefreshing(true);
    getAllTweets();
  }

  function handleEnd() {
    setPage(page + 1);
  }

  function goToProfile() {
    navigation.navigate("Profile Screen");
  }

  function goToSingleTweet() {
    navigation.navigate("Tweet Screen");
  }

  function goToNewTweet() {
    navigation.navigate("New Tweet");
  }
  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToProfile()}>
        <Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => goToSingleTweet()}
        >
          <Text numberOfLines={1} style={styles.tweetName}>
            {tweet.user.name}
          </Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            @{tweet.user.username}
          </Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            {formatDistanceToNowStrict(new Date(tweet.created_at), {
              addSuffix: true,
              locale: {
                ...locale,
                formatDistance,
              },
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tweetContentContainer}
          onPress={() => goToSingleTweet()}
        >
          <Text style={styles.tweetContent}>{tweet.body}</Text>
        </TouchableOpacity>
        <View style={styles.tweetEngagment}>
          <TouchableOpacity style={[styles.flexRow]}>
            <EvilIcons
              name="comment"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>456</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons
              name="retweet"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>46</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons
              name="heart"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>1,234</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons
              name={Platform.OS === "ios" ? "share-apple" : "share-google"}
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} color="gray" size="large" />
      ) : (
        <FlatList
          data={tweets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={styles.tweetSeparator}></View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            !isAtEndOfScrolling && (
              <ActivityIndicator size="large" color="gray" />
            )
          }
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => goToNewTweet()}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textGray: {
    color: "gray",
  },
  flexRow: {
    flexDirection: "row",
  },
  tweetContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tweetSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 12,
    borderRadius: 21,
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222222",
  },
  tweetHandle: {
    marginHorizontal: 8,
    color: "gray",
  },
  tweetContentContainer: {
    marginTop: 4,
  },
  tweetContent: {
    lineHeight: 20,
  },
  tweetEngagment: {
    flexDirection: "row",
  },
  ml4: {
    marginLeft: 24,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d9bf1",
    position: "absolute",
    bottom: 20,
    right: 12,
  },
});
