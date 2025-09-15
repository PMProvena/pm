import { TrendingUp, DollarSign, Star, Gift } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"

interface PointsWidgetProps {
  totalPoints: number
  monthlyPoints: number
  pointsGrowth: number
  nextRewardThreshold: number
  canRequestPayout: boolean
  onRequestPayout: () => void
}

export function PointsWidget({ 
  totalPoints, 
  monthlyPoints, 
  pointsGrowth, 
  nextRewardThreshold,
  canRequestPayout,
  onRequestPayout 
}: PointsWidgetProps) {
  const progressToNextReward = (totalPoints % nextRewardThreshold) / nextRewardThreshold * 100
  const pointsNeeded = nextRewardThreshold - (totalPoints % nextRewardThreshold)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Points</CardTitle>
          <Star className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span>+{pointsGrowth}% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <Gift className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{monthlyPoints.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Points earned this month
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Next Reward</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress to next milestone</span>
              <span>{pointsNeeded} points needed</span>
            </div>
            <Progress value={progressToNextReward} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Available for Withdrawal</p>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-lg font-bold">${(totalPoints * 0.1).toFixed(2)}</span>
                <Badge variant="secondary" className="text-xs">
                  {totalPoints} pts × $0.10
                </Badge>
              </div>
            </div>
            
            <Button 
              disabled={!canRequestPayout}
              onClick={onRequestPayout}
              className="shrink-0"
            >
              Request Payout
            </Button>
          </div>
          
          {!canRequestPayout && (
            <p className="text-xs text-muted-foreground">
              Minimum 1000 points required for payout request
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}