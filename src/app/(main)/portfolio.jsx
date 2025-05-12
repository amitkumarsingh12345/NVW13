// import { portfolioData } from "@/src/components/ImageCard";
// import { useRoute } from "@react-navigation/native";
// import { Link } from "expo-router";
// import { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";

// export default function PortfolioCard() {
//   const [allProjects, setAllProjects] = useState(portfolioData);
//   const [findMore, setFindMore] = useState(false);
//   const route = useRoute();
//   const { portfolio_title, portfolio_img, portfolio_desc, portfolio_link } =
//     route.params || {};

//   useEffect(() => {
//     if (portfolio_title || portfolio_img || portfolio_desc || portfolio_link) {
//       setAllProjects([route.params]);
//       setFindMore(true);
//     }
//   }, [route.params]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {allProjects?.length > 0 ? (
//         allProjects.map((data, index) => (
//           <View style={styles.card} key={index}>
//             <Image
//               source={{
//                 uri:
//                   data.portfolio_img ||
//                   "https://nvwebsoft.com/php_api/assets/website_upload/portfolio/serv_15486847773283.png",
//               }}
//               style={styles.image}
//             />
//             <View style={styles.cardBody}>
//               <Text style={styles.title}>
//                 {data.portfolio_title || "Real Estate App"}
//               </Text>
//               <Text style={styles.description}>
//                 {data.portfolio_desc?.replace(/<[^>]*>/g, "") ||
//                   "Let me know if you'd like to open the link in a WebView instead of an external browser."}
//               </Text>

//               <View style={styles.divider}>
//                 <Text />
//               </View>

//               <View style={styles.buttonContainer}>
//                 <Text style={{ fontWeight: 500, fontFamily: "Ubuntu-Light" }}>
//                   Show Details {">>"}
//                 </Text>
//                 <TouchableOpacity style={styles.button}>
//                   <Link
//                     href={data.portfolio_link}
//                     style={{
//                       color: "#fff",
//                       fontSize: 12,
//                       fontFamily: "Ubuntu-Light",
//                     }}
//                   >
//                     Click here
//                   </Link>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))
//       ) : (
//         <View
//           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//           <Image source={require("../../assets/images/no_data.png")} />
//         </View>
//       )}
//       {findMore && allProjects?.length > 0 && (
//         <TouchableOpacity
//           onPress={() => {
//             setAllProjects(portfolioData);
//             setFindMore(false);
//           }}
//           style={{
//             marginStart: "auto",
//             marginTop: -15,
//           }}
//         >
//           <Text
//             style={{
//               color: "#007bff",
//               fontWeight: 600,
//               padding: 20,
//               fontSize: 15,
//               fontFamily: "Ubuntu-Light",
//             }}
//           >
//             Show More {"..."}
//           </Text>
//         </TouchableOpacity>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     padding: 15,
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     marginBottom: 15,
//     padding: 20,
//     borderRadius: 15,
//     // boxShadow:
//     //   "2px 2px 4px rgba(0,0,0,0.2),inset -1px -1px 2px rgba(255,255,255,0.6)",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderTopLeftRadius: 8,
//     borderRadius: 8,
//     resizeMode: "stretch",
//   },
//   cardBody: {
//     padding: 15,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//     fontFamily: "Ubuntu-Bold",
//   },
//   description: {
//     fontSize: 14,
//     marginBottom: 10,
//     fontFamily: "Ubuntu-Light",
//   },
//   link: {
//     color: "#007bff",
//     fontSize: 14,
//     marginTop: 10,
//     fontFamily: "Ubuntu-Light",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 80,
//   },
//   button: {
//     backgroundColor: "#003463",
//     padding: 5,
//     paddingHorizontal: 10,
//     borderRadius: 15,
//   },
//   divider: {
//     width: "100%",
//     height: 1,
//     backgroundColor: "#fff",
//     shadowColor: "#003463",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//     marginBottom: 10,
//   },
// });

import { portfolioData } from "@/src/components/ImageCard";
import { useRoute } from "@react-navigation/native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function PortfolioCard() {
  const [allProjects, setAllProjects] = useState(portfolioData);
  const [findMore, setFindMore] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null); // NEW STATE
  const route = useRoute();

  const { portfolio_title, portfolio_img, portfolio_desc, portfolio_link } =
    route.params || {};

  useEffect(() => {
    if (portfolio_title || portfolio_img || portfolio_desc || portfolio_link) {
      setAllProjects([route.params]);
      setFindMore(true);
    }
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {allProjects?.length > 0 ? (
        allProjects.map((data, index) => {
          const isExpanded = expandedIndex === index;
          const cleanDesc =
            data.portfolio_desc?.replace(/<[^>]*>/g, "") ||
            "No description available.";
          const shortDesc = cleanDesc.slice(0, 100);

          return (
            <View style={styles.card} key={index}>
              <Image
                source={{
                  uri:
                    data.portfolio_img ||
                    "https://nvwebsoft.com/php_api/assets/website_upload/portfolio/serv_15486847773283.png",
                }}
                style={styles.image}
              />
              <View style={styles.cardBody}>
                <Text style={styles.title}>
                  {data.portfolio_title || "Real Estate App"}
                </Text>

                <Text style={styles.description}>
                  {isExpanded
                    ? cleanDesc
                    : shortDesc + (cleanDesc.length > 100 ? "..." : "")}
                </Text>

                {cleanDesc.length > 100 && (
                  <TouchableOpacity
                    onPress={() => setExpandedIndex(isExpanded ? null : index)}
                  >
                    <Text style={styles.link}>
                      {isExpanded ? "Read Less <<" : "Read More >>"}
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={styles.divider}>
                  <Text />
                </View>

                <View style={styles.buttonContainer}>
                  <Text
                    style={{ fontWeight: "500", fontFamily: "Ubuntu-Light" }}
                  >
                    Show Details {">>"}
                  </Text>
                  <TouchableOpacity style={styles.button}>
                    <Link
                      href={data.portfolio_link}
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontFamily: "Ubuntu-Light",
                      }}
                    >
                      Click here
                    </Link>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={require("../../assets/images/no_data.png")} />
        </View>
      )}

      {findMore && allProjects?.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setAllProjects(portfolioData);
            setFindMore(false);
          }}
          style={{ marginStart: "auto", marginTop: -15 }}
        >
          <Text style={styles.link}>Show More ...</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "stretch",
  },
  cardBody: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "Ubuntu-Medium",
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Ubuntu-Light",
  },
  link: {
    color: "#007bff",
    fontSize: 14,
    marginTop: 5,
    fontFamily: "Ubuntu-Light",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 80,
  },
  button: {
    backgroundColor: "#003463",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#fff",
    shadowColor: "#003463",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
});
