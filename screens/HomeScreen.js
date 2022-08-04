import React, { useState, useLayoutEffect, useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
import { Image, Text, View, SafeAreaView, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured"] {
      ...,
      restaurants[]-> {
            ...,
            dishes[]->
        }
    }
    `).then(data => {
      setFeaturedCategories(data);
    });
  }, []);

  return (
    // <SafeAreaView className="flex-1 items-center justify-center bg-white">
    <SafeAreaView className="bg-white pt-6">
      {/* header */}
      <View className="flex-row pb-3 mx-4 items-center space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-slate-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00cc88" />
          </Text>
        </View>
        <UserIcon size={35} color="#00cc88" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <SearchIcon size={20} color="#bbb" />
          <TextInput placeholder="Restaurants and cruisines" keyboardType="default"/>
        </View>
        <AdjustmentsIcon color="#00cc88"/>
      </View>

      {/* Body */}
      
      <ScrollView className="bg-slate-100">
        <Categories />

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
        />
        ))}

      </ScrollView>


    </SafeAreaView>
  );
}

export default HomeScreen;
