import * as React from 'react';
import {
  type LayoutChangeEvent,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ScrollViewStickyHeader =
  require('react-native/Libraries/Components/ScrollView/ScrollViewStickyHeader').default;

const FIXED = false;

const sections = Array.from({ length: 20 }, (_, s) => ({
  title: `Section ${s + 1}`,
  data: Array.from(
    { length: s === 0 ? 8 : 15 },
    (_, i) => `Row ${s + 1}.${i + 1}`,
  ),
}));

function FixedStickyHeader({ children, onLayout, ...props }: any) {
  const { cellKey, index, onCellLayout } = children.props;
  return (
    <ScrollViewStickyHeader
      {...props}
      onLayout={(event: LayoutChangeEvent) => {
        onLayout(event);
        onCellLayout?.(event, cellKey, index);
      }}
    >
      {React.cloneElement(children, { onCellLayout: undefined })}
    </ScrollViewStickyHeader>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item}
        stickySectionHeadersEnabled
        StickyHeaderComponent={FIXED ? FixedStickyHeader : undefined}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text>{FIXED ? 'Fixed scrolling' : 'Buggy scrolling'}</Text>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, backgroundColor: '#f2f2f2' },
  listHeader: { height: 300, justifyContent: 'center', alignItems: 'center' },
  sectionHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    height: 64,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'white',
  },
});
