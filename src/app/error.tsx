"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Display } from "@/components/typography/display";
import { Text } from "@/components/typography/text";
import { Mono } from "@/components/typography/mono";
import { Kicker } from "@/components/typography/kicker";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if configured
    console.error("Runtime exception captured:", error);
  }, [error]);

  return (
    <div className="w-full flex-1 flex items-center">
      <Section spacing="lg">
        <Container width="content">
          <div className="max-w-xl space-y-6">
            <Kicker index="500" label="Runtime Exception" />
            <Display size="md">
              An unexpected execution state occurred.
            </Display>
            <Text variant="body" muted>
              The system encountered an error while rendering this component. You can attempt to reset the application state.
            </Text>
            {error.digest && (
              <div className="p-3 bg-bg-surface hairline-border rounded-md">
                <Mono size="xs" className="text-text-subtle">
                  Digest ID: {error.digest}
                </Mono>
              </div>
            )}
            <div className="flex items-center gap-3 pt-2">
              <Button onClick={() => reset()} variant="primary">
                Try again
              </Button>
              <Button href="/" variant="outline">
                Return home
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
