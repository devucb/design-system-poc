import { useTranslation } from '@ds/language';
import { Button, Card, Container, Section, Text } from '@ds/ui';

export function Wallet() {
  const { t } = useTranslation();

  return (
    <Container
      edges={['bottom']}
      scroll
      paddingVertical="$lg"
      paddingBottom="$md"
      footer={
        <Button variant="primary" onPress={() => {}}>
          {t('wallet.send')}
        </Button>
      }
    >
      <Section gap="$lg">
        <Card>
          <Section gap="$sm">
            <Text variant="medium" color="secondary">
              {t('wallet.balanceLabel')}
            </Text>
            <Text variant="heading" color="primary">
              {t('wallet.balance')}
            </Text>
          </Section>
        </Card>
        <Section>
          <Text variant="semiBold" color="secondary">
            {t('wallet.recent')}
          </Text>
          <Card>
            <Section gap="$sm">
              <Text variant="semiBold" color="primary">
                {t('wallet.transferTitle')}
              </Text>
              <Text variant="medium" color="secondary">
                {t('wallet.transferBody')}
              </Text>
            </Section>
          </Card>
          <Card>
            <Section gap="$sm">
              <Text variant="semiBold" color="primary">
                {t('wallet.payoutTitle')}
              </Text>
              <Text variant="medium" color="secondary">
                {t('wallet.payoutBody')}
              </Text>
            </Section>
          </Card>
        </Section>
      </Section>
    </Container>
  );
}
