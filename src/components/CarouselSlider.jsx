import React, { useRef, useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import PagerView from "react-native-pager-view";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default function CarouselSlider() {
  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSliderData = async () => {
      try {
        const result = await axios.get(
          "https://nvwebsoft.com/php_api/api.php/slider"
        );
        if (result.data && Array.isArray(result.data)) {
          setSliderData(result.data);
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        setError("Failed to fetch slider data");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    getSliderData();
  }, []);

  useEffect(() => {
    if (sliderData.length === 0) return;
    const interval = setInterval(() => {
      const nextPage = (page + 1) % sliderData.length;
      pagerRef.current?.setPage(nextPage);
      setPage(nextPage);
    }, 5000);
    return () => clearInterval(interval);
  }, [page, sliderData]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (sliderData.length === 0) {
    return (
      <View style={[styles.container, styles.placeholder]}>
        <Text>No slider data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Banner */}
      <View style={styles.topBanner}>
        <Text style={styles.bannerText}>
          Empowering Business Through Smart Technology
        </Text>
      </View>

      {/* Carousel with Fixed Indicators */}
      <View style={styles.carouselWrapper}>
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          ref={pagerRef}
          onPageSelected={(e) => setPage(e.nativeEvent.position)}
        >
          {sliderData.map((data, index) => (
            <View key={index}>
              <Image
                source={{
                  uri: `https://nvwebsoft.com/php_api/assets/website_upload/slider/${data.slider_img}`,
                }}
                style={styles.image}
                resizeMode="stretch"
                onError={() => console.log("Image failed to load")}
              />
            </View>
          ))}
        </PagerView>

        {/* Fixed Position Indicators */}
        <View style={styles.indicatorOverlay}>
          <View style={styles.indicatorContainer}>
            {sliderData.map((_, i) => (
              <View
                key={i}
                style={[styles.indicator, page === i && styles.activeIndicator]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Banner */}
      <View style={styles.bottomBanner}>
        <Text style={styles.bannerText}>
          Empowering Business Through Smart Technology
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: height * 0.33,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 15,
    // boxShadow:
    //   "2px 2px 4px rgba(0,0,0,0.2),inset -1px -1px 2px rgba(255,255,255,0.6)",
  },
  topBanner: {
    backgroundColor: "#003463",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomBanner: {
    backgroundColor: "#003463",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bannerText: {
    color: "#fff",
    fontSize: 12,
    paddingVertical: 5,
    fontFamily: "Ubuntu-Light",
  },
  carouselWrapper: {
    width: "100%",
    height: height * 0.26,
    position: "relative",
  },
  pagerView: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  indicatorOverlay: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#000",
    width: 8,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffebee",
  },
  errorText: {
    color: "red",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
});
