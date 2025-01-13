import { ReactElement, useEffect, useState } from "react";
import {
  ImageBackground,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddCircle, Clock, SearchNormal1 } from "iconsax-react-native";
import CheckBox from "expo-checkbox";
import { Shadow } from "react-native-shadow-2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { v4 } from "uuid";
import { addList, fetchLists, UpdateList, deleteList } from "@/store/lists";
import { BlurView } from "expo-blur";
import { ShoppingList } from "@/types/types";
import { formatDistanceToNow } from "date-fns";
import Loading from "@/components/loading";
import EmptyList from "@/components/empty";

const getGreeting = (): string => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export default function Home(): ReactElement {
  const { lists, status, error } = useSelector(
    (state: RootState) => state.ListManagement
  );
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedList, setSelectedList] = useState<ShoppingList | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [onOpen, setOnOpen] = useState<boolean>(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLists());
    }
  }, []);

  if(status === "Loading") {
    return (
      <Loading />
    )
  }

  if(status === "error") {
    return (
      <SafeAreaView>
        <Text>{status}</Text>
      </SafeAreaView>
    )
  }

  const dispatchToList = (): void => {
    const newItem: ShoppingList = {
      _id: new Date().toISOString(),
      name,
      emoji,
      quantity,
      isCompleted : false,
      updatedAt: new Date().toISOString(),
    };
    dispatch(addList(newItem));
  };

  const handleUpdate = (list: ShoppingList): void => {
    setSelectedList(list);
    setName(list.name);
    setEmoji(list.emoji);
    setQuantity(list.quantity);
    setOnOpen(true);
  };

  const dispatchUpdate = (): void => {
    if (selectedList) {
      const updatedItem: ShoppingList = {
        ...selectedList,
        name,
        emoji,
        quantity,
        updatedAt: new Date().toISOString(),
      };
      dispatch(UpdateList(updatedItem));
      setSelectedList(null);
    }
  };

  const handleDelete = (id: string): void => {
    dispatch(deleteList(id));
  };

  const handleCompletion = (list: ShoppingList): void => {
    const updatedItem: ShoppingList = {
      ...list,
      isCompleted: !list.isCompleted,
      updatedAt: new Date().toISOString(),
    };
    dispatch(UpdateList(updatedItem));
  };

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <View>
        <View className="w-full px-3 py-3">
          <ImageBackground
            source={require("@/assets/images/her.jpeg")}
            className="w-full h-[12rem] p-3"
            borderRadius={10}
          >
            <Text className="text-3xl text-white">Shoppy.</Text>
            <Text className="text-lg text-white">{getGreeting()}.</Text>
            <Text className="w-[15rem] text-2xl text-white">
              Never forget an item again. Stay in control of your{" "}
              <Text>grocery</Text> needs.
            </Text>
          </ImageBackground>
        </View>
        <View className="">
          <View className="flex flex-row justify-between p-2">
            <View className="flex flex-row p-2 gap-2">
              <Text className="text-2xl">Shopping Lists</Text>
              <View className="bg-[#EDB5B4] w-12 rounded-full py-1 px-2 mt-1">
                <Text className="text-center">{lists.length}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity className="flex flex-row gap-1 bg-[#EDB5B4] px-4 py-1 rounded-md mt-3" onPress={() => {
                setOnOpen(true);
              }}>
                <View className="m">
                  <AddCircle size="22" color="white" />
                </View>
                <Text className="text-white mt-[2px] text-md">New</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="px-3 pb-5 pt-3">
            <View className="flex flex-row gap-1 bg-gray-200 py-1 px-4 rounded-xl">
              <View className="pt-2">
                <SearchNormal1 size="24" color="#d1d5db" />
              </View>
              <TextInput
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
          <View className="px-4 flex flex-col gap-3">
            {filteredLists.length === 0 ? (
             <EmptyList setOnOpen={() => setOnOpen(true)} />
            ) : (
              filteredLists.map(list => (
                <View key={list._id}>
                  <View className="bg-gray-100 p-6 rounded-xl flex flex-row justify-between">
                    <View className="flex flex-row gap-2">
                      <View className="mt-3">
                        <Text className="text-4xl">{list.emoji}</Text>
                      </View>
                      <View>
                        <Text className={`text-3xl ${list.isCompleted ? 'line-through' : ''}`}>{list.name}</Text>
                        <View className="flex flex-row gap-2">
                          <View>
                            <Text className="">Quantity: {list.quantity}</Text>
                          </View>
                          <View className="pt-1 bg-gray-400 w-[1px]"></View>
                          <View className="flex flex-row gap-1">
                            <View>
                              <Clock size={"18"} color="black" />
                            </View>
                            <Text className="t">{formatDistanceToNow(new Date(list.updatedAt), { addSuffix : true })}</Text>
                          </View>
                        </View>
                        <View className="py-3 flex flex-row gap-2">
                          <TouchableOpacity className="bg-white w-20 px-3 py-1 rounded-lg" onPress={() => handleDelete(list._id)}>
                            <Text>Delete</Text>
                          </TouchableOpacity>
                          <TouchableOpacity className="bg-white w-20 px-3 py-1 rounded-lg" onPress={() => handleUpdate(list)}>
                            <Text>Update</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View className="pt-5">
                      <CheckBox
                        color={"black"}
                        style={{ borderRadius: 5 }}
                        value={list.isCompleted}
                        onValueChange={() => handleCompletion(list)}
                      />
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </View>
      <Modal transparent visible={onOpen} animationType="slide">
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setOnOpen(false)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="flex-1"
        >
          <View className="flex-1 flex-row justify-center items-center">
            <TouchableOpacity activeOpacity={1} className="bg-white w-[30rem] px-5 py-2 rounded-lg">
              <Text className="text-3xl py-3">{selectedList ? "Update Item" : "New Item"}</Text>
              <View className="flex-col gap-3 pb-4">
                <View className="bg-gray-200 p-2 rounded-xl">
                  <TextInput placeholder="name" value={name} onChangeText={setName} />
                </View>
                <View className="bg-gray-200 p-2 rounded-xl">
                  <TextInput
                    placeholder="Quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                  />
                </View>
                <View className="bg-gray-200 p-2 rounded-xl">
                  <TextInput placeholder="Emoji" value={emoji} onChangeText={setEmoji} />
                </View>
                <View>
                  <TouchableOpacity
                    className="bg-[#fe938c] p-4 rounded-lg my-3"
                    onPress={() => {
                      if (selectedList) {
                        dispatchUpdate();
                      } else {
                        dispatchToList();
                      }
                      setOnOpen(false);
                    }}
                  >
                    <Text className="text-center text-white">Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
