import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full flex-1">
      <Section spacing="lg">
        <Container width="wide">
          <div className="space-y-6 max-w-3xl">
            {/* Kicker Skeleton */}
            <Skeleton className="h-4 w-32" />
            {/* Heading Skeleton */}
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-1/2" />
            {/* Lead Skeleton */}
            <div className="space-y-2 pt-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
            </div>
            {/* Badges Skeleton */}
            <div className="flex gap-2 pt-4">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
