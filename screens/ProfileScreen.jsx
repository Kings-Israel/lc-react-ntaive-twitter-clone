import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  ActivityIndicator
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import axiosConfig from "../helpers/axiosConfig";

export default function ProfileScreen({ route, navigation }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const DATA = [
    {
      id: "1",
      title: "First Item",
    },
    {
      id: "2",
      title: "Second Item",
    },
    {
      id: "3",
      title: "Third Item",
    },
    {
      id: "4",
      title: "Fourth Item",
    },
    {
      id: "5",
      title: "Fifth Item",
    },
    {
      id: "6",
      title: "Sixth Item",
    },
    {
      id: "7",
      title: "Seventh Item",
    },
    {
      id: "8",
      title: "Eigth Item",
    },
    {
      id: "9",
      title: "Ninth Item",
    },
    {
      id: "10",
      title: "Tenth Item",
    },
  ];

  useEffect(() => {
    getUser(route.params.userId);
  }, []);

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

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 20 }}>
      <Text>{item.title}</Text>
    </View>
  );

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
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
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
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      ListHeaderComponent={ProfileHeader}
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
