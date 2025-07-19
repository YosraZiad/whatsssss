import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Customers */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            5,432
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +15.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Growing customer base <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Increased by 723 this quarter
          </div>
        </CardFooter>
      </Card>

      {/* Active Customers */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3,876
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            High engagement rate <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            71.3% of total customers
          </div>
        </CardFooter>
      </Card>

      {/* Monthly Growth */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Growth</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.8%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +0.6%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Consistent monthly growth <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Above industry average
          </div>
        </CardFooter>
      </Card>

      {/* Total Messages */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Messages</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            24,567
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +22.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Increased communication <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Average 5.2 messages per customer
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}