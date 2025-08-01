import { ScrollView, Text, View } from 'react-native';
import { logUI } from '@src/utils/logger.ts';
import { useTheme } from '@src/themes/theme.context.tsx';
import { ScreenHeader } from '@components/ui/ScreenHeader.tsx';
import { CoreComponentStyles } from '@app-types/theme.types.ts';

const TypographyScreen = () => {
  logUI.debug('TypographyScreen Render');
  const { Theme } = useTheme();
  const headingLevels = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <ScrollView
      style={[Theme.styles.Bg, Theme.styles.px3]}
      contentContainerStyle={[Theme.styles.justifyContent.center, Theme.styles.pb5]}
      stickyHeaderIndices={[0]}
    >
      <ScreenHeader title={'Typography'}/>

      {/*Headings*/}
      {headingLevels.map((level) => (
        <View key={level} style={[Theme.styles.mb3]}>
          <Text style={[Theme.styles[`H${level}` as keyof CoreComponentStyles]]}>
            {`Heading ${level}`}
          </Text>
          <Text style={[Theme.styles.Code]}>
            {`<Text style={theme.styles.H${level}}>...</Text>`}
          </Text>
        </View>
      ))}

      {/*Text and Text Decorations */}
      <View style={[Theme.styles.mb3]}>
        <Text style={Theme.styles.Text}>
          Normal Text
        </Text>
        <Text style={[Theme.styles.Code]}>
          {`<Text style={theme.styles.Text}>...</Text>`}
        </Text>
      </View>

      <View style={[Theme.styles.mb3]}>
        <Text style={[Theme.styles.Text, Theme.styles.text.underline]}>
          Underlined Text
        </Text>
        <Text style={[Theme.styles.Code]}>
          {`<Text style={theme.styles.text.underline}>...</Text>`}
        </Text>
      </View>

      <View style={[Theme.styles.mb3]}>
        <Text style={[Theme.styles.Text, Theme.styles.text.strike]}>
          Deleted Text
        </Text>
        <Text style={[Theme.styles.Code]}>
          {`<Text style={theme.styles.text.strike}>...</Text>`}
        </Text>
      </View>

      <View style={[Theme.styles.mb3]}>
        <Text style={[Theme.styles.Text, Theme.styles.text.muted]}>
          Muted Text
        </Text>
        <Text style={[Theme.styles.Code]}>
          {`<Text style={theme.styles.text.muted}>...</Text>`}
        </Text>
      </View>

      <View style={[Theme.styles.mb3]}>
        <Text style={[Theme.styles.Text, Theme.styles.text.small]}>
          Small Text
        </Text>
        <Text style={[Theme.styles.Code]}>
          {`<Text style={theme.styles.text.small}>...</Text>`}
        </Text>
      </View>

      {/*Link*/}
      <View style={[Theme.styles.mb3]}>
        <Text style={Theme.styles.Link}>
          Link - https://example.com/
        </Text>
        <Text style={[Theme.styles.Code]}>
          {`<Text style={theme.styles.Link}>...</Text>`}
        </Text>
      </View>

      {/*Lead*/}
      <View style={[Theme.styles.mb3]}>
        <Text style={Theme.styles.Lead}>
          Lead
        </Text>
        <Text style={[Theme.styles.Code]}>
          {`<Text style={theme.styles.Lead}>...</Text>`}
        </Text>
      </View>

      {/*Code*/}
      <View style={[Theme.styles.mb3]}>
        <Text style={Theme.styles.Code}>
          Code
        </Text>
        <Text style={[Theme.styles.Code]}>
          {`<Text style={theme.styles.Code}>...</Text>`}
        </Text>
      </View>

    </ScrollView>
  );
};

export default TypographyScreen;
