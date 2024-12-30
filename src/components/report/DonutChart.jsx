import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const DonutChart = ({ data }) => {
  const widthAndHeight = 250;
  const colors = [
    "#e75460",
    "#b37ffd",
    "#fd932b",
    "#757ef7",
    "#0a7fdd",
    "#ec842e",
    "#777a72",
    "#69c46e",
    "#42a53c",
    "#ffc107",
    "#f48fb1",
    "#80cbc4",
  ].sort();

  data = data.sort((a, b) => b.count - a.count);

  const series = data.map((item, index) => ({
    value: item.count,
    color: colors[index % colors.length],
  }));

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
          <Text style={styles.title}>Category Group</Text>
        <View style={styles.chartWithLegend}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            cover={0.5}
            padAngle={0.01}
          />
          <View style={styles.legendContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.colorBox, { backgroundColor: colors[index % colors.length] }]} />
                <Text style={styles.legendText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flexDirection: "column",
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartWithLegend: {
    flexDirection: 'row', // Sắp xếp chart và legend theo chiều ngang
    alignItems: 'center',
  },
  legendContainer: {
    marginLeft: 20, // Khoảng cách giữa chart và legend
    flexDirection: 'column', // Chú thích nằm dọc
    justifyContent: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorBox: {
    width: 15, // Kích thước ô màu nhỏ lại
    height: 15, // Kích thước ô màu nhỏ lại
    marginRight: 10,
  },
  legendText: {
    fontSize: 12, // Kích thước chữ nhỏ lại
  },
};

export default DonutChart;
