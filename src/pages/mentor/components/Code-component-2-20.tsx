import {
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Gift,
  Star,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PointTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  date: string;
  projectTitle?: string;
  status: 'completed' | 'pending';
}

interface PayoutRequest {
  id: string;
  amount: number;
  pointsUsed: number;
  method: string;
  status: 'pending' | 'approved' | 'paid';
  requestedAt: string;
  processedAt?: string;
}

const mockTransactions: PointTransaction[] = [
  {
    id: '1',
    type: 'earned',
    amount: 120,
    description: 'Milestone completion feedback',
    date: '2025-09-12',
    projectTitle: 'E-commerce Mobile App Redesign',
    status: 'completed'
  },
  {
    id: '2',
    type: 'earned',
    amount: 100,
    description: 'Quality feedback provided',
    date: '2025-09-08',
    projectTitle: 'FinTech Dashboard Analytics',
    status: 'completed'
  },
  {
    id: '3',
    type: 'earned',
    amount: 100,
    description: 'Milestone completion feedback',
    date: '2025-09-05',
    projectTitle: 'Healthcare Patient Portal',
    status: 'completed'
  },
  {
    id: '4',
    type: 'redeemed',
    amount: -200,
    description: 'Cash payout request',
    date: '2025-09-01',
    status: 'completed'
  },
  {
    id: '5',
    type: 'earned',
    amount: 80,
    description: 'Timely feedback bonus',
    date: '2025-08-28',
    projectTitle: 'E-commerce Mobile App Redesign',
    status: 'completed'
  }
];

const mockPayouts: PayoutRequest[] = [
  {
    id: '1',
    amount: 50.00,
    pointsUsed: 500,
    method: 'PayPal',
    status: 'paid',
    requestedAt: '2025-09-01',
    processedAt: '2025-09-03'
  },
  {
    id: '2',
    amount: 20.00,
    pointsUsed: 200,
    method: 'Bank Transfer',
    status: 'pending',
    requestedAt: '2025-09-10'
  }
];

export function PointsTracker() {
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('');
  const [showPayoutForm, setShowPayoutForm] = useState(false);

  const totalPoints = 2450;
  const availableForPayout = 2450;
  const monthlyEarnings = 420;
  const conversionRate = 0.1; // $0.10 per point

  const getTransactionIcon = (type: PointTransaction['type']) => {
    return type === 'earned' ? 
      <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
      <DollarSign className="h-4 w-4 text-blue-500" />;
  };

  const getStatusColor = (status: PayoutRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-blue-500';
      case 'paid': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handlePayoutRequest = () => {
    const points = parseInt(payoutAmount);
    if (points > availableForPayout) {
      alert('Insufficient points for payout');
      return;
    }
    
    // Handle payout request
    console.log('Payout request:', {
      points,
      amount: points * conversionRate,
      method: payoutMethod
    });
    
    setShowPayoutForm(false);
    setPayoutAmount('');
    setPayoutMethod('');
  };

  return (
    <div className="space-y-8">
      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Lifetime earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyEarnings}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(availableForPayout * conversionRate).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Available for payout
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Request Payout</span>
            </CardTitle>
            <CardDescription>
              Convert your points to cash rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm">Conversion Rate:</span>
                <span className="font-medium">1 point = ${conversionRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">Minimum Payout:</span>
                <span className="font-medium">100 points ($10.00)</span>
              </div>
            </div>

            {!showPayoutForm ? (
              <Button 
                className="w-full" 
                onClick={() => setShowPayoutForm(true)}
                disabled={availableForPayout < 100}
              >
                <Gift className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Points to Convert</Label>
                  <Input
                    type="number"
                    placeholder="Enter points amount"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    max={availableForPayout}
                    min={100}
                  />
                  {payoutAmount && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Cash value: ${(parseInt(payoutAmount) * conversionRate).toFixed(2)}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Payout Method</Label>
                  <Select onValueChange={setPayoutMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payout method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="gift-card">Gift Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowPayoutForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handlePayoutRequest}
                    disabled={!payoutAmount || !payoutMethod || parseInt(payoutAmount) < 100}
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
            <CardDescription>
              Track your payout requests and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPayouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">${payout.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {payout.pointsUsed} points • {payout.method}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Requested: {payout.requestedAt}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(payout.status)} text-white border-0`}
                  >
                    {payout.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {payout.status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                    <span className="capitalize">{payout.status}</span>
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Points History */}
      <Card>
        <CardHeader>
          <CardTitle>Points History</CardTitle>
          <CardDescription>
            Track your earnings and redemptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    {transaction.projectTitle && (
                      <p className="text-sm text-muted-foreground">{transaction.projectTitle}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'earned' ? '+' : ''}{transaction.amount} pts
                  </p>
                  <Badge 
                    variant="outline" 
                    className={transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Goal</CardTitle>
          <CardDescription>
            Track your progress towards monthly targets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Points Earned This Month</span>
            <span>{monthlyEarnings} / 500</span>
          </div>
          <Progress value={(monthlyEarnings / 500) * 100} className="h-3" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-green-600">84%</p>
              <p className="text-xs text-muted-foreground">Goal Progress</p>
            </div>
            <div>
              <p className="text-lg font-bold">80</p>
              <p className="text-xs text-muted-foreground">Points Needed</p>
            </div>
            <div>
              <p className="text-lg font-bold">7</p>
              <p className="text-xs text-muted-foreground">Days Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}