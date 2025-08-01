import { ScrollView, Text, View, TextInput, Pressable } from 'react-native';
import { useTheme } from '@src/themes/theme.context.tsx';
import { ScreenHeader } from '@components/ui/ScreenHeader.tsx';
import { logUI } from '@src/utils/logger.ts';

const ComponentsScreen = () => {
  logUI.debug('ComponentsScreen Render');
  const { Theme } = useTheme();

  return (
    <ScrollView
      style={[Theme.styles.Bg, Theme.styles.px3]}
      contentContainerStyle={[Theme.styles.py3]}
      stickyHeaderIndices={[0]}
    >
      <ScreenHeader title="Components" />

      {/*/!* Typography *!/*/}
      {/*<Section title="Typography">*/}
      {/*  <Text style={[Theme.styles.H1, Theme.styles.mb2]}>H1 Heading</Text>*/}
      {/*  <Text style={[Theme.styles.H2, Theme.styles.mb2]}>H2 Heading</Text>*/}
      {/*  <Text style={[Theme.styles.H3, Theme.styles.mb2]}>H3 Heading</Text>*/}
      {/*  <Text style={[Theme.styles.H4, Theme.styles.mb2]}>H4 Heading</Text>*/}
      {/*  <Text style={[Theme.styles.H5, Theme.styles.mb2]}>H5 Heading</Text>*/}
      {/*  <Text style={[Theme.styles.H6, Theme.styles.mb2]}>H6 Heading</Text>*/}
      {/*  <Text style={[Theme.styles.Lead, Theme.styles.mb2]}>Lead text for emphasis</Text>*/}
      {/*  <Text style={[Theme.styles.Link, Theme.styles.mb2]}>This is a link</Text>*/}
      {/*  <Text style={[Theme.styles.Text, Theme.styles.text.muted]}>Muted text example</Text>*/}
      {/*</Section>*/}

      {/* Inputs */}
      <Section title="Text Inputs">
        <TextInput style={[Theme.styles.TextInput, Theme.styles.mb3]} placeholder="Default Input" placeholderTextColor={Theme.colors.neutral300} />
        <TextInput style={[Theme.styles.TextInput, Theme.styles.mb3]} placeholder="Another Input" placeholderTextColor={Theme.colors.neutral300} />
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <Pressable style={[Theme.styles.Button, Theme.styles.ButtonDefault, Theme.styles.mb2]}>
          <Text style={Theme.styles.ButtonDefaultText}>Default Button</Text>
        </Pressable>
        <Pressable style={[Theme.styles.Button, Theme.styles.ButtonPrimary]}>
          <Text style={Theme.styles.ButtonPrimaryText}>Primary Button</Text>
        </Pressable>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <View style={[Theme.styles.Card, Theme.styles.p3, Theme.styles.mb3]}>
          <Text style={Theme.styles.CardText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spec.</Text>
        </View>
      </Section>

      {/* Labels */}
      <Section title="Labels">
        <View style={[Theme.styles.row, Theme.styles.g2]}>
          <View style={Theme.styles.Label}>
            <Text style={Theme.styles.LabelText}>Default Label</Text>
          </View>
          <View style={[Theme.styles.Label, { backgroundColor: Theme.colors.success }]}>
            <Text style={Theme.styles.LabelText}>Success</Text>
          </View>
          <View style={[Theme.styles.Label, { backgroundColor: Theme.colors.danger }]}>
            <Text style={Theme.styles.LabelText}>Danger</Text>
          </View>
        </View>
      </Section>

      {/* Tags */}
      <Section title="Tags">
        <View style={[Theme.styles.row, Theme.styles.g2]}>
          <View style={Theme.styles.Tag}>
            <Text style={Theme.styles.TagText}>Tag 1</Text>
          </View>
          <View style={Theme.styles.Tag}>
            <Text style={Theme.styles.TagText}>Tag 2</Text>
          </View>
          <View style={Theme.styles.Tag}>
            <Text style={Theme.styles.TagText}>Tag 3</Text>
          </View>
        </View>
      </Section>
    </ScrollView>
  );
};

// Simple reusable section wrapper
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const { Theme } = useTheme();
  return (
    <View style={Theme.styles.mb4}>
      <Text style={[Theme.styles.H3, Theme.styles.mb2]}>{title}</Text>
      {children}
    </View>
  );
};

export default ComponentsScreen;
