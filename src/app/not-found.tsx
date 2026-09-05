import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Display } from "@/components/typography/display";
import { Text } from "@/components/typography/text";
import { Kicker } from "@/components/typography/kicker";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex items-center">
      <Section spacing="lg">
        <Container width="content">
          <div className="max-w-xl space-y-6">
            <Kicker index="404" label="Not Found" />
            <Display size="md">
              The requested coordinate does not exist.
            </Display>
            <Text variant="lead" muted>
              The route or document you are looking for has either moved or was not indexed in this system.
            </Text>
            <div className="pt-2">
              <Button href="/" variant="primary">
                Return to Overview
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
