import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import axiosConfig from "../helpers/axiosConfig";
import { format } from "date-fns";
import { Modalize } from "react-native-modalize";
import { AuthContext } from "../context/AuthProvider";

export default function TweetScreen({ route, navigation }) {
  const [tweet, setTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const modalizeRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getTweet(route.params.tweetId);
  }, []);

  function getTweet(tweet) {
    axiosConfig
      .get(`/tweets/${tweet}`)
      .then((response) => {
        setTweet(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  function goToProfile(userId) {
    navigation.navigate("Profile Screen", {
      userId: userId,
    });
  }

  function deleteTweet() {
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;
    axiosConfig
      .delete(`/tweets/${route.params.tweetId}`)
      .then((response) => {
        Alert.alert("Tweet deleted");
        navigation.navigate("Home1", {
          tweetDeleted: true,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function showDeleteAlert() {
    Alert.alert("Are you sure?", null, [
      {
        text: "Cances",
        onPress: () => modalizeRef.current?.close(),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => deleteTweet(),
        style: "default",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} color="gray" size="large" />
      ) : (
        <>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.flexRow}
              onPress={() => goToProfile(tweet.user.id)}
            >
              <Image
                style={styles.avatar}
                source={{ uri: tweet.user.avatar }}
              />
              <View>
                <Text style={styles.tweetName}>{tweet.user.name}</Text>
                <Text style={styles.tweetHandle}>@{tweet.user.username}</Text>
              </View>
            </TouchableOpacity>
            {user.id === tweet.user_id && (
              <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
                <Entypo name="dots-three-vertical" size={24} color="gray" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.tweetContentContainer}>
            <Text style={styles.tweetContent}>{tweet.body}</Text>
          </View>
          <View style={styles.tweetTimestampContainer}>
            <Text style={styles.tweetTimestampText}>
              {format(new Date(tweet.created_at), "h:mm")}
            </Text>
            <Text style={styles.tweetTimestampText}>&middot;</Text>
            <Text style={styles.tweetTimestampText}>
              {format(new Date(tweet.created_at), "d MMM.yy")}
            </Text>
            <Text style={styles.tweetTimestampText}>&middot;</Text>
            <Text style={[styles.tweetTimestampText, styles.linkColor]}>
              Twitter for android
            </Text>
          </View>
          <View style={styles.tweetEngagement}>
            <View style={styles.flexRow}>
              <Text style={styles.tweetEngagementNumber}>628</Text>
              <Text style={styles.tweetEngagementLabel}>Retweets</Text>
            </View>
            <View style={[styles.flexRow, styles.ml4]}>
              <Text style={styles.tweetEngagementNumber}>36</Text>
              <Text style={styles.tweetEngagementLabel}>Quote Tweets</Text>
            </View>
            <View style={[styles.flexRow, styles.ml4]}>
              <Text style={styles.tweetEngagementNumber}>2,987</Text>
              <Text style={styles.tweetEngagementLabel}>Likes</Text>
            </View>
          </View>
          <View style={[styles.tweetEngagement, styles.spaceAround]}>
            <TouchableOpacity style={[styles.flexRow]}>
              <EvilIcons name="comment" size={28} color="gray" />
              <Text style={styles.textGray}>456</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
              <EvilIcons name="retweet" size={28} color="gray" />
              <Text style={styles.textGray}>46</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
              <EvilIcons name="heart" size={28} color="gray" />
              <Text style={styles.textGray}>1,234</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
              <EvilIcons
                name={Platform.OS === "ios" ? "share-apple" : "share-google"}
                size={28}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      <Modalize ref={modalizeRef} snapPoint={200}>
        <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
          <TouchableOpacity style={styles.menuButton}>
            <AntDesign name="pushpino" size={24} color="#222" />
            <Text style={styles.menuButtonText}>Pin Tweet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuButton, styles.mt6]}
            onPress={() => showDeleteAlert()}
          >
            <AntDesign name="delete" size={24} color="#222" />
            <Text style={styles.menuButtonText}>Delete Tweet</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flexRow: {
    flexDirection: "row",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 25,
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222222",
  },
  tweetHandle: {
    color: "gray",
    marginTop: 4,
  },
  tweetContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tweetContent: {
    fontSize: 20,
    lineHeight: 30,
  },
  tweetEngagement: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tweetEngagementNumber: {
    fontWeight: "bold",
  },
  tweetEngagementLabel: {
    color: "gray",
    marginLeft: 6,
  },
  tweetTimestampContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  tweetTimestampText: {
    color: "gray",
    marginRight: 6,
  },
  linkColor: {
    color: "#1d9bf1",
  },
  ml4: {
    marginLeft: 24,
  },
  mt6: {
    marginTop: 32,
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButtonText: {
    fontSize: 20,
    color: "#222",
    marginLeft: 12,
  },
});
