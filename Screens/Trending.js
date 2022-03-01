import React from "react";
import FlatListBig from "../components/flatlistBig";


const TrendingScreen = () => {
    return(
        <FlatListBig/>
        
    );
}

export default TrendingScreen;

 {/*<SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          showsVerticalScrollIndicator={false}

          renderSectionHeader={({ section }) => (
            <>
            <View style={styles.headerContainer}>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(section.title)}>
              <Text style={styles.headerSubTitle}>VIEW ALL</Text>
            </TouchableOpacity>
            </View>
            <FlatList 
              data={section.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return <AnimeCard item={item} />;
              }}
            />
            </>
          )}
          renderItem={({ item, section }) => {
            return null;
          }}
        />*/}
  