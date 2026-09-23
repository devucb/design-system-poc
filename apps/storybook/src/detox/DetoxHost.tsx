import { useState, type ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hydrateLanguage } from '@ds/language';
import { hydrateThemePreference, TamaguiRoot } from '@ds/theme';
import { Box, Dots, Loading, Select, SheetProvider } from '@ds/ui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

hydrateThemePreference();
hydrateLanguage();

type City = { label: string; value: string };

const cities: City[] = [
  { label: 'Istanbul', value: 'ist' },
  { label: 'Ankara', value: 'ank' },
  { label: 'Izmir', value: 'izm' },
];

function SelectHost() {
  const [value, setValue] = useState<City | undefined>(undefined);
  return (
    <Select
      label="City"
      placeholder="Select a city"
      options={cities}
      value={value}
      keyExtractor={city => city.value}
      labelExtractor={city => city.label}
      onChange={setValue}
      testID="select"
    />
  );
}

const hosts: Record<string, () => ReactElement> = {
  select: () => <SelectHost />,
  loading: () => <Loading testID="loading" />,
  dots: () => <Dots activeStep={2} stepCount={4} testID="dots" />,
};

export function DetoxHost({ id }: { id: string }) {
  const Host = hosts[id];
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <TamaguiRoot>
          <SheetProvider>
            <Box
              flex={1}
              padding="$lg"
              backgroundColor="$backgroundBase"
              testID="detox-host"
            >
              {Host ? <Host /> : <Loading testID="loading" />}
            </Box>
          </SheetProvider>
        </TamaguiRoot>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
