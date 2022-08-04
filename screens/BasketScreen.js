import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import { selectBasketItems, removeFromBasket, selectBasketTotal } from "../features/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

//   console.log(groupedItemsInBasket);
// {
//     "ca75a96a-e64b-4154-bfa6-bb8ea413d02c": [
//         {
//             "id": "ca75a96a-e64b-4154-bfa6-bb8ea413d02c",
//             "name": "curry",
//             "description": "spicy ",
//             "price": 30.5,
//             "image": {
//                 "_type": "image",
//                 "asset": {
//                     "_ref": "image-ac67ab8a2de625b5110af0563263c69cee03c0d0-1366x768-png",
//                     "_type": "reference"
//                 }
//             }
//         }
//     ],
//     "414becea-315e-4b03-bd29-1698b02c1d66": [
//         {
//             "id": "414becea-315e-4b03-bd29-1698b02c1d66",
//             "name": "kebab",
//             "description": "iranian",
//             "price": 58.88,
//             "image": {
//                 "_type": "image",
//                 "asset": {
//                     "_ref": "image-c9a0702b5ad34f201ca8b8bb477b81664039fa58-1367x769-png",
//                     "_type": "reference"
//                 }
//             }
//         },
//         {
//             "id": "414becea-315e-4b03-bd29-1698b02c1d66",
//             "name": "kebab",
//             "description": "iranian",
//             "price": 58.88,
//             "image": {
//                 "_type": "image",
//                 "asset": {
//                     "_ref": "image-c9a0702b5ad34f201ca8b8bb477b81664039fa58-1367x769-png",
//                     "_type": "reference"
//                 }
//             }
//         }
//     ]
// }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00cc88] bg-white shadow-xs">
            <View>
                <Text className="text-lg font-bold text-center">Basket</Text>
                <Text className="text-center text-gray-400">{restaurant.title}</Text>
            </View>
            <TouchableOpacity
                onPress={navigation.goBack}
                className="rounded-full bg-gray-100 absolute top-3 right-3"
            >
                <XCircleIcon color="#00cc88" height={50} width={50} />
            </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
            <Image
                source={{
                    uri: "https://links.papareact.com/wru"
                }}
                className="w-7 h-7 bg-gray-300 p-4 rounded-full"
            />
            <Text className="flex-1"> deliver in 15 mins</Text>
            <TouchableOpacity>
                <Text className="text-[#00cc88]">Change</Text>
            </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                <View key={key} className="flex-row items-center space-x-3 bg-white px-3 py-2">
                    <Text className="text-[#00cc88]">{items.length} &#9747;</Text>
                    <Image
                        source={{
                            uri: urlFor(items[0]?.image).url()
                        }}
                        className="h-12 w-12 rounded-full"
                    />
                    <Text className="flex-1">{items[0]?.name}</Text>
                    <Text className="text-gray-600">RM{items[0]?.price}</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00cc88] text-xs" onPress={() => dispatch(removeFromBasket({ id: key }))}>Remove</Text>
                    </TouchableOpacity>
                
                </View>
            ))}
        </ScrollView>

        <View className="bg-white p-5 mt-5 space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-gray-400">RM{basketTotal}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Delivery Fee</Text>
              <Text className="text-gray-400">RM5.99</Text>
            </View>
            <View className="flex-row justify-between">
              <Text>Order Total</Text>
              <Text className="font-extrabold">RM{basketTotal + 5.99}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('PreparingOrder')} className="rounded-lg bg-[#00ccbb] p-4">
              <Text className="text-center text-white text-lg font-bold">Place Order</Text>
            </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
