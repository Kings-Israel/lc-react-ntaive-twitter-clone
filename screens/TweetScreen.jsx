import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from '@expo/vector-icons';

export default function TweetScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.flexRow}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
          <View>
            <Text style={styles.tweetName}>Kings Milimo</Text>
            <Text style={styles.tweetHandle}>@kingsisrael</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.tweetContentContainer}>
        <Text style={styles.tweetContent}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ipsa
          officiis provident exercitationem tempore vel ipsum minus in ipsam
          omnis, id possimus autem odit quae voluptatum sequi? Quisquam iure
          voluptatem dolorum? Quibusdam fugiat libero qui, perferendis vel
          corrupti a odio.
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
            <EvilIcons 
              name="comment" 
              size={28} 
              color="gray" 
             />
            <Text style={styles.textGray}>456</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons 
              name="retweet" 
              size={28} 
              color="gray" 
             />
            <Text style={styles.textGray}>46</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons 
              name="heart" 
              size={28} 
              color="gray" 
             />
            <Text style={styles.textGray}>1,234</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons 
              name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'} 
              size={28} 
              color="gray" 
             />
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tweetEngagementNumber: {
    fontWeight: 'bold'
  },
  tweetEngagementLabel: {
    color: 'gray',
    marginLeft: 6
  },
  ml4: {
    marginLeft: 24
  },
  spaceAround: {
    justifyContent: 'space-around'
  }
});
