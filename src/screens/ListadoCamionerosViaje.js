import React, { useState, useEffect, useContext } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
} from "react-native";
//Components
import { ListItem, Icon } from "@rneui/themed";
//Styles
import { tripListStyles } from "../styles/GlobalStyles";

export default function ListadoCamionerosViaje({ route }) {
    const drivers = route.params
    const [expandedItems, setExpanded] = useState([]);
    return (
        <SafeAreaView>
            <ScrollView style={{ width: "100%" }}>
                {drivers.map((v, i) => {
                        return (
                            <ListItem.Accordion
                                topDivider
                                key={`accordion${i}`}
                                content={
                                    <>
                                        <Icon name="chevron-right" size={25} />
                                        <ListItem.Content>
                                            <ListItem.Title style={tripListStyles.itemStyle}>
                                                {v.apenom}
                                            </ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={expandedItems.includes(i)}
                                onPress={() => {
                                    if (expandedItems.includes(i)) {
                                        setExpanded(expandedItems.filter((id) => id !== i));
                                    } else {
                                        setExpanded([...expandedItems, i]);
                                    }
                                }}
                            >
                                {/*Contenido acordion*/}
                                <ListItem key={`item${i}`} bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Subtitle>
                                            Camion: {v.camion}{"\n"}
                                            Batea: {v.batea}{"\n"}
                                            Dni: {v.dni}{"\n"}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </ListItem.Accordion>
                        );
                    })}
            </ScrollView>
        </SafeAreaView>
    );
};
