
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Send,
  Search,
  Users,
  Calendar,
  Clock,
  MapPin,
  ThumbsUp,
  Heart,
  MessageCircle,
  Share2,
  PlusCircle,
  Bookmark,
  User,
  Image,
  Smile,
  PaperclipIcon,
  Filter,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type Channel = {
  id: string;
  name: string;
  description: string;
  members: number;
  unread?: number;
  lastActivity: string;
  image?: string;
  tags: string[];
};

type Message = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked?: boolean;
};

type Post = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  tags: string[];
};

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image?: string;
  tags: string[];
  isVirtual: boolean;
  isAttending?: boolean;
};

const Community = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const { toast } = useToast();

  // Mock data for channels
  const channels: Channel[] = [
    {
      id: "climate",
      name: "Climate Action",
      description: "Discuss climate change solutions, policies, and local initiatives.",
      members: 1245,
      unread: 5,
      lastActivity: "10 minutes ago",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      tags: ["environment", "climate", "sustainability"],
    },
    {
      id: "education",
      name: "Education Access",
      description: "Connect with others working on education equity and reform.",
      members: 876,
      lastActivity: "1 hour ago",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      tags: ["education", "equality", "youth"],
    },
    {
      id: "hunger",
      name: "Food Security",
      description: "Share resources and initiatives addressing hunger and food access.",
      members: 654,
      unread: 2,
      lastActivity: "2 hours ago",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbafc3ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      tags: ["food", "hunger", "community"],
    },
    {
      id: "conservation",
      name: "Wildlife Conservation",
      description: "Discuss conservation efforts, biodiversity, and wildlife protection.",
      members: 932,
      lastActivity: "30 minutes ago",
      image: "https://images.unsplash.com/photo-1564509044383-64a586c47ad6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      tags: ["wildlife", "conservation", "biodiversity"],
    },
    {
      id: "healthcare",
      name: "Healthcare Access",
      description: "Exchange ideas on improving healthcare access and equity globally.",
      members: 732,
      lastActivity: "4 hours ago",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      tags: ["health", "healthcare", "equity"],
    },
  ];

  // Mock data for messages
  const messages: Message[] = [
    {
      id: "m1",
      userId: "u1",
      userName: "Alex Johnson",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Has anyone seen the latest IPCC report? There are some really important findings we should discuss.",
      timestamp: "11:45 AM",
      likes: 5,
      replies: 2,
    },
    {
      id: "m2",
      userId: "u2",
      userName: "Maya Chen",
      userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Yes! I was especially concerned about the predicted sea level rise. I'm working with a local group on coastal resilience if anyone wants to join.",
      timestamp: "11:52 AM",
      likes: 3,
      replies: 1,
    },
    {
      id: "m3",
      userId: "u3",
      userName: "James Wilson",
      userAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
      content: "I'm organizing a community tree planting event next month. Would love to have more volunteers join us! We're aiming to plant 500 trees in urban areas with low canopy coverage.",
      timestamp: "12:15 PM",
      likes: 8,
      replies: 4,
    },
    {
      id: "m4",
      userId: "u4",
      userName: "Sophia Garcia",
      userAvatar: "https://randomuser.me/api/portraits/women/54.jpg",
      content: "Has anyone implemented climate education programs in their local schools? Looking for curriculum resources and success stories to share with our district.",
      timestamp: "12:30 PM",
      likes: 2,
      replies: 3,
    },
    {
      id: "m5",
      userId: "u5",
      userName: "Michael Kim",
      userAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
      content: "Just wanted to share this great resource on individual actions to reduce carbon footprint: [link]. It has practical tips that actually make a difference.",
      timestamp: "1:05 PM",
      likes: 10,
      replies: 1,
    },
  ];

  // Mock data for posts
  const posts: Post[] = [
    {
      id: "p1",
      userId: "u1",
      userName: "Emma Davis",
      userAvatar: "https://randomuser.me/api/portraits/women/17.jpg",
      content: "Just finished a successful beach cleanup with our community group! We collected over 200 pounds of plastic and debris. Small actions add up to big impact. #OceanConservation #ClimateAction",
      image: "https://images.unsplash.com/photo-1618477462146-050d2767eac4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      timestamp: "2 hours ago",
      likes: 45,
      comments: 7,
      tags: ["conservation", "climate", "community"],
    },
    {
      id: "p2",
      userId: "u2",
      userName: "Carlos Mendez",
      userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      content: "Excited to share that our education access initiative has received funding to provide scholarships to 50 students from underserved communities! This will help break barriers to quality education. Looking for mentors to support these talented students.",
      timestamp: "5 hours ago",
      likes: 72,
      comments: 12,
      tags: ["education", "equality", "youth"],
    },
    {
      id: "p3",
      userId: "u3",
      userName: "Aisha Patel",
      userAvatar: "https://randomuser.me/api/portraits/women/67.jpg",
      content: "Our community garden is thriving! We're now providing fresh produce to 3 local food banks weekly. Food security starts with local action. Join us for volunteer days every Saturday morning!",
      image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      timestamp: "1 day ago",
      likes: 38,
      comments: 5,
      tags: ["hunger", "food", "community"],
    },
  ];

  // Mock data for events
  const events: Event[] = [
    {
      id: "e1",
      title: "Global Climate Action Summit",
      description: "Join activists, policy makers, and scientists to discuss coordinated climate action strategies.",
      date: "October 15, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco, CA",
      attendees: 456,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      tags: ["climate", "policy", "global"],
      isVirtual: true,
    },
    {
      id: "e2",
      title: "Community Garden Volunteer Day",
      description: "Help plant, maintain, and harvest food for local food banks and community members.",
      date: "July 10, 2023",
      time: "10:00 AM - 2:00 PM",
      location: "Central Community Garden, Portland, OR",
      attendees: 28,
      image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      tags: ["hunger", "community", "volunteer"],
      isVirtual: false,
    },
    {
      id: "e3",
      title: "Education Equity Workshop",
      description: "Learn about strategies to advocate for equal educational opportunities in your community.",
      date: "July 23, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Online Zoom Webinar",
      attendees: 112,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      tags: ["education", "equality", "workshop"],
      isVirtual: true,
    },
  ];

  // Filter channels based on search query
  const filteredChannels = channels.filter((channel) =>
    searchQuery === "" ||
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    channel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    channel.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to participate in discussions.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message Sent",
      description: "Your message has been posted to the channel.",
    });
    
    setMessageInput("");
  };

  const handleSubmitPost = () => {
    if (!newPostContent.trim()) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to create posts.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Post Created",
      description: "Your post has been shared with the community.",
    });
    
    setNewPostContent("");
  };

  const handleAttendEvent = (eventId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to RSVP to events.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "RSVP Confirmed",
      description: "You're now registered for this event. Details have been sent to your email.",
    });
  };

  const promptLogin = () => {
    toast({
      title: "Login Required",
      description: "Please log in to access this feature.",
      variant: "destructive",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy-700">Community</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with like-minded individuals, share ideas, collaborate on projects, 
              and join discussions about causes that matter to you.
            </p>
          </div>

          <Tabs defaultValue="chat">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white">
                <TabsTrigger value="chat" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Chat Channels
                </TabsTrigger>
                <TabsTrigger value="feed" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Community Feed
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Upcoming Events
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Chat Channels Tab */}
            <TabsContent value="chat">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Channel Sidebar */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Channels</CardTitle>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <PlusCircle className="h-4 w-4" />
                          <span className="sr-only">Create Channel</span>
                        </Button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          className="pl-10"
                          placeholder="Search channels..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </CardHeader>
                    <ScrollArea className="h-[500px]">
                      <div className="px-4 py-2">
                        {filteredChannels.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            No channels found matching your search.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {filteredChannels.map((channel) => (
                              <div
                                key={channel.id}
                                className={`flex items-start p-3 rounded-md cursor-pointer transition-colors ${
                                  activeChannel?.id === channel.id
                                    ? "bg-teal-50 border border-teal-200"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => setActiveChannel(channel)}
                              >
                                {channel.image ? (
                                  <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 mr-3">
                                    <img
                                      src={channel.image}
                                      alt={channel.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 rounded-md bg-teal-100 flex items-center justify-center flex-shrink-0 mr-3">
                                    <MessageSquare className="h-5 w-5 text-teal-600" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-medium text-navy-700 truncate">
                                      {channel.name}
                                    </h4>
                                    {channel.unread && (
                                      <Badge className="ml-2 bg-teal-400">
                                        {channel.unread}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500 line-clamp-2">
                                    {channel.description}
                                  </p>
                                  <div className="flex items-center mt-1 text-xs text-gray-400">
                                    <Users className="h-3 w-3 mr-1" />
                                    {channel.members} members
                                    <span className="mx-2">•</span>
                                    <Clock className="h-3 w-3 mr-1" />
                                    {channel.lastActivity}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </Card>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-2">
                  {activeChannel ? (
                    <Card className="h-full flex flex-col">
                      <CardHeader className="pb-3 border-b">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {activeChannel.image ? (
                              <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                                <img
                                  src={activeChannel.image}
                                  alt={activeChannel.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-md bg-teal-100 flex items-center justify-center mr-3">
                                <MessageSquare className="h-5 w-5 text-teal-600" />
                              </div>
                            )}
                            <div>
                              <CardTitle>{activeChannel.name}</CardTitle>
                              <CardDescription>
                                {activeChannel.members} members • {activeChannel.tags.map(tag => `#${tag}`).join(", ")}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div key={message.id} className="flex">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-3">
                                <img
                                  src={message.userAvatar}
                                  alt={message.userName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <span className="font-medium text-navy-700">
                                    {message.userName}
                                  </span>
                                  <span className="text-xs text-gray-400 ml-2">
                                    {message.timestamp}
                                  </span>
                                </div>
                                <p className="text-gray-700 mt-1">
                                  {message.content}
                                </p>
                                <div className="flex items-center mt-2 space-x-3">
                                  <button className="text-gray-500 hover:text-teal-500 text-xs flex items-center">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {message.likes}
                                  </button>
                                  <button className="text-gray-500 hover:text-teal-500 text-xs flex items-center">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    {message.replies}
                                  </button>
                                  <button className="text-gray-500 hover:text-teal-500 text-xs flex items-center">
                                    <Share2 className="h-3 w-3 mr-1" />
                                    Share
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="p-4 border-t">
                        <div className="flex items-end gap-2">
                          <Textarea
                            placeholder={isAuthenticated ? "Type your message..." : "Log in to join the conversation..."}
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="min-h-[80px] flex-1"
                            disabled={!isAuthenticated}
                          />
                          <div className="flex flex-col space-y-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="rounded-full"
                              onClick={isAuthenticated ? () => {} : promptLogin}
                            >
                              <PaperclipIcon className="h-5 w-5 text-gray-500" />
                              <span className="sr-only">Attach file</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="rounded-full"
                              onClick={isAuthenticated ? () => {} : promptLogin}
                            >
                              <Image className="h-5 w-5 text-gray-500" />
                              <span className="sr-only">Add image</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="rounded-full"
                              onClick={isAuthenticated ? () => {} : promptLogin}
                            >
                              <Smile className="h-5 w-5 text-gray-500" />
                              <span className="sr-only">Add emoji</span>
                            </Button>
                            <Button
                              size="icon"
                              className="rounded-full bg-teal-400 hover:bg-teal-500"
                              onClick={handleSendMessage}
                              disabled={!messageInput.trim() || !isAuthenticated}
                            >
                              <Send className="h-5 w-5" />
                              <span className="sr-only">Send message</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <Card className="h-[600px] flex items-center justify-center">
                      <div className="text-center p-6">
                        <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-navy-700 mb-2">
                          Select a Channel
                        </h3>
                        <p className="text-gray-500 max-w-md">
                          Choose a channel from the list to join discussions on topics
                          you're passionate about.
                        </p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Community Feed Tab */}
            <TabsContent value="feed">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                  {/* New Post Form */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <Textarea
                            placeholder={isAuthenticated ? "Share something with the community..." : "Log in to create a post..."}
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            className="resize-none mb-3"
                            disabled={!isAuthenticated}
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-gray-500"
                                onClick={isAuthenticated ? () => {} : promptLogin}
                              >
                                <Image className="h-4 w-4 mr-1" />
                                Photo
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-gray-500"
                                onClick={isAuthenticated ? () => {} : promptLogin}
                              >
                                <MapPin className="h-4 w-4 mr-1" />
                                Location
                              </Button>
                            </div>
                            <Button
                              className="bg-teal-400 hover:bg-teal-500"
                              size="sm"
                              onClick={handleSubmitPost}
                              disabled={!newPostContent.trim() || !isAuthenticated}
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Posts */}
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img
                              src={post.userAvatar}
                              alt={post.userName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-navy-700">
                                  {post.userName}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {post.timestamp}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Bookmark className="h-4 w-4" />
                                <span className="sr-only">Save post</span>
                              </Button>
                            </div>
                            <p className="mt-2 text-gray-700">{post.content}</p>
                            {post.image && (
                              <div className="mt-3 rounded-md overflow-hidden">
                                <img
                                  src={post.image}
                                  alt="Post attachment"
                                  className="w-full h-auto max-h-[400px] object-cover"
                                />
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2 mt-3">
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="bg-teal-50 text-teal-700 border-teal-200"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            <Separator className="my-3" />
                            <div className="flex justify-between items-center text-sm">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-red-500"
                                onClick={isAuthenticated ? () => {} : promptLogin}
                              >
                                <Heart
                                  className={`h-4 w-4 mr-1 ${
                                    post.isLiked ? "fill-red-500 text-red-500" : ""
                                  }`}
                                />
                                {post.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500"
                                onClick={isAuthenticated ? () => {} : promptLogin}
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {post.comments} Comments
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500"
                                onClick={isAuthenticated ? () => {} : promptLogin}
                              >
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Trending Discussions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Trending Discussions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Badge className="bg-teal-400">#1</Badge>
                          <div>
                            <h4 className="font-medium text-navy-700 text-sm">
                              Climate Policy Summit Outcomes
                            </h4>
                            <p className="text-xs text-gray-500">
                              156 discussions • 34 new today
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Badge className="bg-teal-400">#2</Badge>
                          <div>
                            <h4 className="font-medium text-navy-700 text-sm">
                              Community Garden Best Practices
                            </h4>
                            <p className="text-xs text-gray-500">
                              98 discussions • 12 new today
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Badge className="bg-teal-400">#3</Badge>
                          <div>
                            <h4 className="font-medium text-navy-700 text-sm">
                              Education Equity Report
                            </h4>
                            <p className="text-xs text-gray-500">
                              87 discussions • 8 new today
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full text-teal-600 border-teal-200">
                        View All Trends
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Suggested Channels */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Suggested Channels</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-md bg-orange-100 flex items-center justify-center mr-2">
                              <Users className="h-4 w-4 text-orange-600" />
                            </div>
                            <span className="font-medium text-sm">Community Development</span>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-xs">
                            Join
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center mr-2">
                              <Users className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-sm">Water Conservation</span>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-xs">
                            Join
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center mr-2">
                              <Users className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="font-medium text-sm">Sustainable Living</span>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-xs">
                            Join
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full text-teal-600 border-teal-200">
                        Discover More
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Active Members */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Active Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={i} className="text-center">
                            <div className="relative">
                              <img
                                src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${20 + i}.jpg`}
                                alt="Member"
                                className="w-10 h-10 rounded-full"
                              />
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            </div>
                          </div>
                        ))}
                        <div className="text-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-medium">
                            +24
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-navy-700">Upcoming Events</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button className="bg-teal-400 hover:bg-teal-500">Create Event</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden card-hover">
                      <div className="relative h-40">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className={`${
                            event.isVirtual ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                          }`}>
                            {event.isVirtual ? "Virtual" : "In Person"}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-navy-700">{event.title}</CardTitle>
                        <CardDescription className="flex flex-col space-y-1">
                          <span className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            {event.date}
                          </span>
                          <span className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            {event.time}
                          </span>
                          <span className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            {event.location}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-teal-50 text-teal-700 border-teal-200"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {event.attendees} attending
                        </div>
                        <Button 
                          className={event.isAttending ? "bg-orange-400 hover:bg-orange-500" : "bg-teal-400 hover:bg-teal-500"}
                          onClick={() => handleAttendEvent(event.id)}
                        >
                          {event.isAttending ? "Attending" : "Attend"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
