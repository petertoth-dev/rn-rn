import { ScrollView, Text, View } from 'react-native';
import { useEffect } from 'react';
import { logUI } from '@src/utils/logger.ts';
import { useTheme } from '@src/themes/theme.context.tsx';
import { ScreenHeader } from '@components/ui/ScreenHeader.tsx';

const GridBox = ({ label }: { label: string }) => {
  const { Theme } = useTheme();
  return (
    <View style={[Theme.styles.m1]}>
      <View style={[Theme.styles.p3, Theme.styles.justifyContent.center, Theme.styles.alignItems.center, Theme.styles.background.primary, {borderRadius: 4}]}>
        <Text style={[Theme.styles.Text, { color: Theme.colors.white }]}>{label}</Text>
      </View>
    </View>
  );
};

const GridSystemScreen = () => {
  logUI.debug('GridSystemScreen Render');
  const { Theme } = useTheme();

  useEffect(() => {}, []);

  return (
    <ScrollView
      style={[Theme.styles.Bg, Theme.styles.px3]}
      contentContainerStyle={[Theme.styles.justifyContent.start, Theme.styles.py3]}
      stickyHeaderIndices={[0]}
    >
      <ScreenHeader title="Grid System" />

      {/* Row with equal columns */}
      <View style={[Theme.styles.mb4]}>
        <Text style={[Theme.styles.H5, Theme.styles.mb2]}>Equal Columns (row + col.grow)</Text>
        <View style={[Theme.styles.row]}>
          <View style={[Theme.styles.col.grow]}>
            <GridBox label="col.grow" />
          </View>
          <View style={[Theme.styles.col.grow]}>
            <GridBox label="col.grow" />
          </View>
          <View style={[Theme.styles.col.grow]}>
            <GridBox label="col.grow" />
          </View>
        </View>
      </View>

      {/* Row with auto + grow */}
      <View style={[Theme.styles.mb4]}>
        <Text style={[Theme.styles.H5, Theme.styles.mb2]}>Auto + Grow Columns</Text>
        <View style={[Theme.styles.row]}>
          <View style={[Theme.styles.col.auto]}>
            <GridBox label="col.auto" />
          </View>
          <View style={[Theme.styles.col.grow]}>
            <GridBox label="col.grow" />
          </View>
        </View>
      </View>

      {/* Justify Content Variations */}
      <View style={[Theme.styles.mb4]}>
        <Text style={[Theme.styles.H5, Theme.styles.mb2]}>Justify Content</Text>

        <Text style={[Theme.styles.Text, Theme.styles.mb1]}>justifyContent.start</Text>
        <View style={[Theme.styles.row, Theme.styles.justifyContent.start]}>
          <GridBox label="Box 1" />
          <GridBox label="Box 2" />
        </View>

        <Text style={[Theme.styles.Text, Theme.styles.mt3, Theme.styles.mb1]}>justifyContent.center</Text>
        <View style={[Theme.styles.row, Theme.styles.justifyContent.center]}>
          <GridBox label="Box 1" />
          <GridBox label="Box 2" />
        </View>

        <Text style={[Theme.styles.Text, Theme.styles.mt3, Theme.styles.mb1]}>justifyContent.spaceBetween</Text>
        <View style={[Theme.styles.row, Theme.styles.justifyContent.spaceBetween]}>
          <GridBox label="Box 1" />
          <GridBox label="Box 2" />
        </View>
      </View>

      {/* Mixed Layout */}
      <View style={[Theme.styles.mb4]}>
        <Text style={[Theme.styles.H5, Theme.styles.mb2]}>Mixed Layout</Text>
        <View style={[Theme.styles.row]}>
          <View style={[Theme.styles.col.auto]}>
            <GridBox label="col.auto" />
          </View>
          <View style={[Theme.styles.col.grow]}>
            <GridBox label="col.grow" />
          </View>
          <View style={[Theme.styles.col.auto]}>
            <GridBox label="col.auto" />
          </View>
        </View>
      </View>

      {/* Column Sizes */}
      <View style={[Theme.styles.mb4]}>
        <Text style={[Theme.styles.H5, Theme.styles.mb1]}>Column Sizes</Text>
        <Text style={[Theme.styles.Text, Theme.styles.text.muted, Theme.styles.mb2]}>col.col[x]</Text>

        <View style={[Theme.styles.row]}>
          <View style={Theme.styles.col.col1}>
            <GridBox label="1" />
          </View>
          <View style={Theme.styles.col.col2}>
            <GridBox label="col2" />
          </View>
          <View style={Theme.styles.col.col3}>
            <GridBox label="col3" />
          </View>
          <View style={Theme.styles.col.col6}>
            <GridBox label="col6" />
          </View>
        </View>

        <View style={[Theme.styles.row]}>
          <View style={Theme.styles.col.col2}>
            <GridBox label="col2" />
          </View>
          <View style={Theme.styles.col.col10}>
            <GridBox label="col10" />
          </View>
        </View>

        <View style={[Theme.styles.row]}>
          <View style={Theme.styles.col.col4}>
            <GridBox label="col4" />
          </View>
          <View style={Theme.styles.col.col8}>
            <GridBox label="col8" />
          </View>
        </View>

        <View style={[Theme.styles.row]}>
          <View style={Theme.styles.col.col5}>
            <GridBox label="col5" />
          </View>
          <View style={Theme.styles.col.col7}>
            <GridBox label="col7" />
          </View>
        </View>

        <View style={[Theme.styles.row]}>
          <View style={[Theme.styles.col.col6]}>
            <GridBox label="col6" />
          </View>
          <View style={Theme.styles.col.col6}>
            <GridBox label="col6" />
          </View>
        </View>

        <View style={[Theme.styles.row]}>
          <View style={Theme.styles.col.col3}>
            <GridBox label="col3" />
          </View>
          <View style={Theme.styles.col.col9}>
            <GridBox label="col9" />
          </View>
        </View>

        <View style={[Theme.styles.row]}>
          <View style={Theme.styles.col.col12}>
            <GridBox label="col12" />
          </View>
        </View>

        <View style={[Theme.styles.row]}>
          <View style={Theme.styles.col.col2}>
            <GridBox label="col2" />
          </View>
          <View style={Theme.styles.col.col3}>
            <GridBox label="col3" />
          </View>
          <View style={Theme.styles.col.col7}>
            <GridBox label="col7" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default GridSystemScreen;