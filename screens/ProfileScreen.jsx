import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  ActivityIndicator,
  Alert,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import axiosConfig from "../helpers/axiosConfig";
import RenderTweet from "../components/RenderTweet";
import { AuthContext } from "../context/AuthProvider";

export default function ProfileScreen({ route, navigation }) {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user: userFromContext } = useContext(AuthContext);

  useEffect(() => {
    getUser(route.params.userId);
    getUserTweets(route.params.userId);
  }, [page]);

  useEffect(() => {
    getIsFollowing();
  }, []);

  function getIsFollowing() {
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userFromContext.token}`;
    axiosConfig
      .get(`/is_following/${route.params.userId}`)
      .then((response) => {
        setIsFollowing(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function follow(user) {
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userFromContext.token}`;
    axiosConfig
      .post(`/follow/${user}`)
      .then((response) => {
        setIsFollowing(true);
        Alert.alert("User Followed");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function unfollow(user) {
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userFromContext.token}`;
    axiosConfig
      .post(`/unfollow/${user}`)
      .then((response) => {
        Alert.alert("User Unfollowed");
        setIsFollowing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUser(user) {
    axiosConfig
      .get(`/users/${user}`)
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  function getUserTweets(user) {
    axiosConfig
      .get(`/user/${user}/tweets/?page=${page}`)
      .then((response) => {
        // console.log(response.data.data)
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
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(true);
    getUserTweets();
  }

  function handleEnd() {
    setPage(page + 1);
  }

  const ProfileHeader = () => (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} color="gray" size="large" />
      ) : (
        <>
          <Image
            style={styles.backGroundImage}
            source={{
              uri: "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufBD8fHx86&auto=format&fit=crop&w=1080&q=80",
            }}
          />

          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: user.avatar }} />
            {userFromContext.id != route.params.userId && (
              <View>
                {isFollowing ? (
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => unfollow(user.id)}
                  >
                    <Text style={styles.followButtonText}>Unfollow</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => follow(user.id)}
                  >
                    <Text style={styles.followButtonText}>Follow</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileHandle}>@{user.username}</Text>
          </View>

          <View style={styles.profileContainer}>
            <Text style={styles.profileContainerText}>{user.profile}</Text>
          </View>

          <View style={styles.locationContainer}>
            <EvilIcons name="location" size={24} color="gray" />
            <Text style={styles.textGray}>{user.location}</Text>
          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => Linking.openURL(user.link)}
            >
              <EvilIcons name="link" size={24} color="gray" />
              <Text style={styles.linkColor}>{user.linkText}</Text>
            </TouchableOpacity>
            <View style={[styles.linkItem, styles.ml4]}>
              <EvilIcons name="calendar" size={24} color="gray" />
              <Text style={styles.textColor}>
                Joined {format(new Date(user.created_at), "MMM yyy")}
              </Text>
            </View>
          </View>

          <View style={styles.followContainer}>
            <View style={styles.followItem}>
              <Text style={styles.followItemNumber}>509</Text>
              <Text style={styles.followItemLabel}> Following</Text>
            </View>
            <View style={[styles.followItem, styles.ml4]}>
              <Text style={styles.followItemNumber}>2,3456</Text>
              <Text style={styles.followItemLabel}> Followers</Text>
            </View>
          </View>

          <View style={styles.separator}></View>
        </>
      )}
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={tweets}
      renderItem={(props) => <RenderTweet {...props} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      ListHeaderComponent={ProfileHeader}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleEnd}
      onEndReachedThreshold={0}
      ListFooterComponent={() =>
        !isAtEndOfScrolling && <ActivityIndicator size="large" color="gray" />
      }
      scrollIndicatorInsets={{ right: 1 }}
    />
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
  ml4: {
    marginLeft: 24,
  },
  backGroundImage: {
    width: 800,
    height: 120,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    marginTop: -34,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
  },
  followButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 22,
  },
  profileHandle: {
    color: "gray",
    marginTop: 1,
  },
  profileContainer: {
    paddingHorizontal: 10,
    marginTop: 8,
  },
  profileContainerText: {
    lineHeight: 22,
  },
  locationContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  linkContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 4,
  },
  linkColor: {
    color: "#1d9bf1",
  },
  linkItem: {
    flexDirection: "row",
  },
  followContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  followItem: {
    flexDirection: "row",
  },
  followItemNumber: {
    fontWeight: "bold",
  },
  followitem: {
    marginLeft: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
});
