import { useState } from 'react';
import { Pressable } from 'react-native';
import { Box } from '../../Box/Box';
import { Button } from '../../Button/Button';
import { List } from '../../List/List';
import type { ListRenderItemInfo } from '../../List/List.props';
import { Section } from '../../Section/Section';
import { Sheet } from '../../Sheet/Sheet';
import { Text } from '../../Text/Text';
import type { SelectProps } from './Select.props';

/**
 * Above this many options the sheet switches to a tall box with a virtualized
 * List. Below it the sheet keeps hugging its content, which a virtualized list
 * cannot do — it has no natural height.
 */
const virtualizeAfter = 8;

/** Labeled select. Options open in the catalog Sheet. */
export function Select<T>({
  label,
  options,
  value,
  onChange,
  keyExtractor,
  labelExtractor,
  renderItem,
  placeholder,
  error,
  testID,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const selectedKey = value === undefined ? undefined : keyExtractor(value);
  const selected =
    selectedKey === undefined
      ? undefined
      : options.find(option => keyExtractor(option) === selectedKey);
  const virtualized = options.length > virtualizeAfter;

  function renderOption({ item, index }: ListRenderItemInfo<T>) {
    const isSelected =
      selectedKey !== undefined && keyExtractor(item) === selectedKey;
    const onSelect = () => {
      onChange(item);
      setOpen(false);
    };
    if (renderItem) {
      return renderItem({ item, index, selected: isSelected, onSelect });
    }
    return (
      <Button
        testID={`select-option-${keyExtractor(item)}`}
        variant={isSelected ? 'primary' : 'secondary'}
        onPress={onSelect}
      >
        {labelExtractor(item)}
      </Button>
    );
  }

  return (
    <Section gap="$sm">
      <Text variant="semiBold" color="primary">
        {label}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        testID={testID}
        onPress={() => setOpen(true)}
      >
        <Box
          backgroundColor="$cardBackground"
          borderRadius="$md"
          padding="$md"
        >
          <Text variant="medium" color={selected ? 'primary' : 'secondary'}>
            {selected ? labelExtractor(selected) : placeholder ?? label}
          </Text>
        </Box>
      </Pressable>
      {error ? (
        <Text variant="medium" color="secondary">
          {error}
        </Text>
      ) : null}
      <Sheet
        open={open}
        onOpenChange={setOpen}
        size={virtualized ? 'large' : 'content'}
      >
        <Box flex={virtualized ? 1 : undefined} padding="$lg" gap="$mdl">
          <Text variant="heading">{label}</Text>
          {virtualized ? (
            <List
              data={options}
              extraData={selectedKey}
              keyExtractor={keyExtractor}
              renderItem={renderOption}
              gap="$mdl"
              sheet
              accessibilityLabel={label}
            />
          ) : (
            <Section gap="$mdl">
              {options.map((option, index) => (
                <Box key={keyExtractor(option)}>
                  {renderOption({ item: option, index })}
                </Box>
              ))}
            </Section>
          )}
        </Box>
      </Sheet>
    </Section>
  );
}
