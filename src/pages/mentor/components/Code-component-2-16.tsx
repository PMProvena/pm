import {
  ArrowLeft,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  Send,
  Star
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

interface Deliverable {
  id: string;
  title: string;
  type: 'document' | 'presentation' | 'prototype' | 'research';
  uploadedAt: string;
  fileUrl?: string;
  description: string;
  feedback?: {
    rating: number;
    comments: string;
    providedAt: string;
  };
}

interface Feedback {
  rating: number;
  comments: string;
}

interface DeliverableReviewProps {
  deliverable: Deliverable;
  onBack: () => void;
  onFeedbackSubmit: (feedback: Feedback) => void;
}

export function DeliverableReview({ deliverable, onBack, onFeedbackSubmit }: DeliverableReviewProps) {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFileTypeIcon = (type: Deliverable['type']) => {
    switch (type) {
      case 'document': return <FileText className="h-5 w-5" />;
      case 'presentation': return <FileText className="h-5 w-5" />;
      case 'prototype': return <ExternalLink className="h-5 w-5" />;
      case 'research': return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: Deliverable['type']) => {
    switch (type) {
      case 'document': return 'bg-blue-500';
      case 'presentation': return 'bg-purple-500';
      case 'prototype': return 'bg-green-500';
      case 'research': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onFeedbackSubmit({
      rating,
      comments
    });
    
    setIsSubmitting(false);
  };

  const alreadyReviewed = !!deliverable.feedback;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Review Deliverable</h1>
              <p className="text-muted-foreground mt-2">
                Provide detailed feedback to help the team improve
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deliverable Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(deliverable.type)} text-white`}>
                      {getFileTypeIcon(deliverable.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{deliverable.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {deliverable.description}
                      </CardDescription>
                      <div className="flex items-center space-x-4 mt-4">
                        <Badge variant="outline" className="capitalize">
                          {deliverable.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Uploaded: {deliverable.uploadedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {deliverable.fileUrl && (
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download File
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Previous Feedback (if exists) */}
            {alreadyReviewed && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Previous Feedback</span>
                  </CardTitle>
                  <CardDescription>
                    Feedback provided on {deliverable.feedback!.providedAt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < deliverable.feedback!.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {deliverable.feedback!.rating}/5
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>Comments</Label>
                    <p className="text-sm text-muted-foreground mt-1 p-3 bg-muted rounded-lg">
                      {deliverable.feedback!.comments}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Feedback Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Feedback Guidelines</CardTitle>
                <CardDescription>
                  Provide constructive and actionable feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm">Be specific about what works well and what could be improved</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm">Provide actionable suggestions for improvement</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm">Consider the project context and timeline constraints</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm">Highlight industry best practices when relevant</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {alreadyReviewed ? 'Update Feedback' : 'Provide Feedback'}
                </CardTitle>
                <CardDescription>
                  {alreadyReviewed 
                    ? 'You can update your previous feedback if needed'
                    : 'Rate and comment on this deliverable'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Rating *</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className="focus:outline-none"
                          onMouseEnter={() => setHoveredRating(i + 1)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => setRating(i + 1)}
                        >
                          <Star 
                            className={`h-6 w-6 transition-colors ${
                              i < (hoveredRating || rating)
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300 hover:text-yellow-200'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {rating}/5
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {rating === 1 && "Needs significant improvement"}
                    {rating === 2 && "Below expectations"}
                    {rating === 3 && "Meets expectations"}
                    {rating === 4 && "Exceeds expectations"}
                    {rating === 5 && "Outstanding work"}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Detailed Comments</Label>
                  <Textarea
                    placeholder="Provide specific, constructive feedback. What did they do well? What could be improved? Any suggestions for next steps?"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {comments.length}/500 characters
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={handleSubmitFeedback}
                    disabled={rating === 0 || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>{alreadyReviewed ? 'Update Feedback' : 'Submit Feedback'}</span>
                      </div>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={onBack}>
                    Save as Draft
                  </Button>
                </div>

                {alreadyReviewed && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">
                        You've already provided feedback for this deliverable
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Points Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Points Reward</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">+50 Points</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Earned for providing feedback
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Quality feedback:</span>
                    <span>+30 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timely response:</span>
                    <span>+20 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}