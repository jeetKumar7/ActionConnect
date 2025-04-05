
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, ArrowRight, RefreshCw, PieChart, Sparkles, UserPlus } from "lucide-react";

type Cause = {
  id: string;
  name: string;
  description: string;
  matchPercentage: number;
  tags: string[];
  actions: string[];
  image: string;
};

type Question = {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    causes: string[];
  }[];
};

const PassionFinder = () => {
  const [step, setStep] = useState<"intro" | "quiz" | "results">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [matchedCauses, setMatchedCauses] = useState<Cause[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      text: "Which of these issues do you find most concerning in today's world?",
      options: [
        {
          id: "a",
          text: "Environmental degradation and climate change",
          causes: ["climate", "conservation"],
        },
        {
          id: "b",
          text: "Inequality and lack of access to opportunities",
          causes: ["equality", "education"],
        },
        {
          id: "c",
          text: "Poverty and economic injustice",
          causes: ["poverty", "hunger"],
        },
        {
          id: "d",
          text: "Health crises and inadequate healthcare access",
          causes: ["healthcare", "mental-health"],
        },
      ],
    },
    {
      id: 2,
      text: "If you had a day off to volunteer, which activity would you choose?",
      options: [
        {
          id: "a",
          text: "Participate in a beach or park cleanup",
          causes: ["conservation", "climate"],
        },
        {
          id: "b",
          text: "Tutor children from underserved communities",
          causes: ["education", "equality"],
        },
        {
          id: "c",
          text: "Serve meals at a homeless shelter",
          causes: ["hunger", "poverty"],
        },
        {
          id: "d",
          text: "Assist at a free health clinic",
          causes: ["healthcare", "mental-health"],
        },
      ],
    },
    {
      id: 3,
      text: "What type of news story is most likely to catch your attention?",
      options: [
        {
          id: "a",
          text: "A breakthrough in renewable energy technology",
          causes: ["climate", "innovation"],
        },
        {
          id: "b",
          text: "A community successfully advocating for equal rights",
          causes: ["equality", "community"],
        },
        {
          id: "c",
          text: "An innovative approach to reducing hunger in developing nations",
          causes: ["hunger", "poverty"],
        },
        {
          id: "d",
          text: "A new medical discovery that could save many lives",
          causes: ["healthcare", "innovation"],
        },
      ],
    },
    {
      id: 4,
      text: "What skill or expertise would you most like to contribute to a cause?",
      options: [
        {
          id: "a",
          text: "Scientific knowledge or environmental expertise",
          causes: ["climate", "conservation", "innovation"],
        },
        {
          id: "b",
          text: "Teaching, mentoring, or communication skills",
          causes: ["education", "community", "equality"],
        },
        {
          id: "c",
          text: "Organizational or logistics management abilities",
          causes: ["hunger", "poverty", "disaster-relief"],
        },
        {
          id: "d",
          text: "Healthcare knowledge or caregiving experience",
          causes: ["healthcare", "mental-health", "elderly-care"],
        },
      ],
    },
    {
      id: 5,
      text: "What aspect of social change interests you the most?",
      options: [
        {
          id: "a",
          text: "Creating sustainable systems for the future",
          causes: ["climate", "conservation", "sustainable-development"],
        },
        {
          id: "b",
          text: "Empowering marginalized communities",
          causes: ["equality", "community", "education"],
        },
        {
          id: "c",
          text: "Addressing immediate humanitarian needs",
          causes: ["hunger", "poverty", "disaster-relief"],
        },
        {
          id: "d",
          text: "Improving quality of life through better health",
          causes: ["healthcare", "mental-health", "elderly-care"],
        },
      ],
    },
  ];

  const causes: Record<string, Cause> = {
    climate: {
      id: "climate",
      name: "Climate Action",
      description: "Working to combat climate change and its impacts through sustainable practices, policy advocacy, and community education.",
      matchPercentage: 0,
      tags: ["environment", "sustainability", "renewable energy", "policy"],
      actions: [
        "Join local climate advocacy groups",
        "Volunteer for climate education initiatives",
        "Support renewable energy projects",
        "Participate in climate strikes and rallies"
      ],
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    conservation: {
      id: "conservation",
      name: "Wildlife Conservation",
      description: "Protecting and preserving wildlife and natural habitats through conservation efforts, anti-poaching initiatives, and ecosystem restoration.",
      matchPercentage: 0,
      tags: ["wildlife", "biodiversity", "ecosystem", "preservation"],
      actions: [
        "Volunteer with wildlife conservation organizations",
        "Participate in habitat restoration projects",
        "Support anti-poaching initiatives",
        "Advocate for protected areas and wildlife corridors"
      ],
      image: "https://images.unsplash.com/photo-1564509044383-64a586c47ad6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    education: {
      id: "education",
      name: "Education Access",
      description: "Promoting equal access to quality education for all, particularly in underserved communities and for marginalized populations.",
      matchPercentage: 0,
      tags: ["learning", "literacy", "schools", "opportunity"],
      actions: [
        "Volunteer as a tutor or mentor",
        "Support school supply drives",
        "Advocate for education funding and policy reform",
        "Help build or improve educational facilities"
      ],
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    equality: {
      id: "equality",
      name: "Equality & Rights",
      description: "Fighting for equal rights, social justice, and ending discrimination based on race, gender, sexuality, religion, or ability.",
      matchPercentage: 0,
      tags: ["justice", "human rights", "diversity", "inclusion"],
      actions: [
        "Join civil rights organizations",
        "Participate in awareness campaigns",
        "Support legal advocacy for marginalized groups",
        "Engage in community dialogue and education"
      ],
      image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    healthcare: {
      id: "healthcare",
      name: "Healthcare Access",
      description: "Working to ensure that everyone has access to quality, affordable healthcare services and medical treatments worldwide.",
      matchPercentage: 0,
      tags: ["health", "medicine", "wellness", "accessibility"],
      actions: [
        "Volunteer at free health clinics",
        "Support medical outreach programs",
        "Advocate for healthcare policy reform",
        "Participate in health education initiatives"
      ],
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    "mental-health": {
      id: "mental-health",
      name: "Mental Health Awareness",
      description: "Promoting mental health awareness, reducing stigma, and improving access to mental health services and support.",
      matchPercentage: 0,
      tags: ["psychology", "wellness", "support", "education"],
      actions: [
        "Volunteer with mental health organizations",
        "Participate in awareness campaigns",
        "Support crisis intervention services",
        "Advocate for mental health policy improvements"
      ],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    hunger: {
      id: "hunger",
      name: "Hunger Relief",
      description: "Addressing food insecurity and hunger through food banks, meal programs, sustainable agriculture, and policy change.",
      matchPercentage: 0,
      tags: ["food security", "nutrition", "agriculture", "community"],
      actions: [
        "Volunteer at food banks or soup kitchens",
        "Organize food drives",
        "Support sustainable agriculture initiatives",
        "Advocate for food security policies"
      ],
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbafc3ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    poverty: {
      id: "poverty",
      name: "Poverty Reduction",
      description: "Working to alleviate poverty through economic development, housing initiatives, financial education, and policy advocacy.",
      matchPercentage: 0,
      tags: ["economic justice", "housing", "employment", "development"],
      actions: [
        "Support microfinance initiatives",
        "Volunteer with housing assistance programs",
        "Participate in job training and placement services",
        "Advocate for economic justice policies"
      ],
      image: "https://images.unsplash.com/photo-1519430044529-9a9a57177865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    innovation: {
      id: "innovation",
      name: "Social Innovation",
      description: "Developing creative solutions to social problems through technology, entrepreneurship, and collaborative approaches.",
      matchPercentage: 0,
      tags: ["technology", "entrepreneurship", "solutions", "creativity"],
      actions: [
        "Join social innovation hubs or incubators",
        "Participate in hackathons for social good",
        "Support social enterprises",
        "Mentor social entrepreneurs"
      ],
      image: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    community: {
      id: "community",
      name: "Community Development",
      description: "Building stronger, more resilient communities through local initiatives, civic engagement, and grassroots organizing.",
      matchPercentage: 0,
      tags: ["local action", "civic engagement", "neighborhood", "grassroots"],
      actions: [
        "Join neighborhood associations",
        "Participate in community planning processes",
        "Support local businesses and initiatives",
        "Volunteer for community improvement projects"
      ],
      image: "https://images.unsplash.com/photo-1556484687-30636164638b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // Save the current answer
      setAnswers({
        ...answers,
        [currentQuestion]: selectedAnswer,
      });

      // Move to next question or show results
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        calculateResults();
        setStep("results");
      }
    }
  };

  const calculateResults = () => {
    const causeScores: Record<string, number> = {};

    // Initialize all causes with zero score
    Object.keys(causes).forEach((causeId) => {
      causeScores[causeId] = 0;
    });

    // Tally the scores based on answers
    Object.entries(answers).forEach(([questionIndex, answerId]) => {
      const question = questions[parseInt(questionIndex)];
      const selectedOption = question.options.find((option) => option.id === answerId);

      if (selectedOption) {
        selectedOption.causes.forEach((causeId) => {
          causeScores[causeId] = (causeScores[causeId] || 0) + 1;
        });
      }
    });

    // Calculate percentages and update the causes
    const maxScore = Math.max(...Object.values(causeScores));
    const updatedCauses = { ...causes };

    Object.entries(causeScores).forEach(([causeId, score]) => {
      if (updatedCauses[causeId]) {
        const percentage = Math.round((score / maxScore) * 100);
        updatedCauses[causeId] = {
          ...updatedCauses[causeId],
          matchPercentage: percentage,
        };
      }
    });

    // Get top causes (scoring > 50%)
    const topCauses = Object.values(updatedCauses)
      .filter((cause) => cause.matchPercentage > 50)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setMatchedCauses(topCauses.length > 0 ? topCauses : [updatedCauses.community]);
  };

  const restartQuiz = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
    setMatchedCauses([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {step === "intro" && (
            <div className="text-center">
              <div className="inline-block p-3 bg-orange-100 rounded-full mb-6">
                <Heart className="h-12 w-12 text-red-500" />
              </div>
              <h1 className="text-4xl font-bold text-navy-700 mb-4">
                Find Your Passion
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Discover the social causes that align with your values, interests,
                and skills. Take our quick quiz to find where you can make the
                biggest impact.
              </p>
              <Button
                onClick={() => setStep("quiz")}
                className="bg-teal-400 hover:bg-teal-500 flex items-center"
                size="lg"
              >
                Start the Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === "quiz" && (
            <div>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                    Complete
                  </span>
                </div>
                <Progress
                  value={((currentQuestion + 1) / questions.length) * 100}
                  className="h-2"
                />
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-navy-700 text-xl">
                    {questions[currentQuestion].text}
                  </CardTitle>
                  <CardDescription>
                    Select the option that best resonates with you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedAnswer || ""}
                    onValueChange={setSelectedAnswer}
                    className="space-y-4"
                  >
                    {questions[currentQuestion].options.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-start space-x-3 rounded-lg border p-4 transition-all ${
                          selectedAnswer === option.id
                            ? "border-teal-400 bg-teal-50"
                            : "hover:border-teal-200 hover:bg-teal-50/50"
                        }`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={option.id}
                          className="flex-1 cursor-pointer"
                        >
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1);
                        setSelectedAnswer(answers[currentQuestion - 1] || null);
                      } else {
                        setStep("intro");
                      }
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="bg-teal-400 hover:bg-teal-500"
                  >
                    {currentQuestion < questions.length - 1
                      ? "Next Question"
                      : "See Results"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {step === "results" && (
            <div>
              <div className="text-center mb-12">
                <div className="inline-block p-3 bg-teal-100 rounded-full mb-6">
                  <Sparkles className="h-12 w-12 text-teal-400" />
                </div>
                <h1 className="text-4xl font-bold text-navy-700 mb-4">
                  Your Passion Results
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Based on your responses, here are the causes that align most
                  closely with your values, interests, and skills.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {matchedCauses.map((cause) => (
                  <Card key={cause.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={cause.image}
                        alt={cause.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-navy-700">
                          {cause.name}
                        </CardTitle>
                        <Badge className="bg-teal-400 text-white">
                          {cause.matchPercentage}% Match
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2 space-y-4">
                      <p className="text-gray-600 text-sm">
                        {cause.description}
                      </p>
                      <div>
                        <h4 className="text-sm font-medium text-navy-700 mb-2">
                          Key Focus Areas:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cause.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-teal-50 text-teal-700 border-teal-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-navy-700 mb-2">
                          Ways to Get Involved:
                        </h4>
                        <ul className="space-y-1">
                          {cause.actions.slice(0, 3).map((action, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 flex items-start"
                            >
                              <span className="inline-block h-4 w-4 rounded-full bg-teal-100 text-teal-700 flex-shrink-0 mr-2 mt-0.5 text-center text-xs">
                                {index + 1}
                              </span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-teal-700"
                      >
                        Learn More
                      </Button>
                      <Button
                        size="sm"
                        className="bg-teal-400 hover:bg-teal-500"
                      >
                        Take Action
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <PieChart className="h-5 w-5 mr-2 text-teal-400" />
                      Explore Related Causes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Discover more causes that might interest you based on your
                      profile.
                    </p>
                    <Button className="w-full bg-navy-700 hover:bg-navy-800">
                      View All Causes
                    </Button>
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <UserPlus className="h-5 w-5 mr-2 text-teal-400" />
                      Find Like-minded People
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Connect with others who share your passion for these causes.
                    </p>
                    <Button className="w-full bg-navy-700 hover:bg-navy-800">
                      Visit the Map
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Button
                  onClick={restartQuiz}
                  variant="outline"
                  className="flex items-center"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retake the Quiz
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PassionFinder;
