import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Globe, Users, BookOpen, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-24 bg-gradient-to-r from-teal-50 to-navy-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-navy-700 sm:text-5xl md:text-6xl">
                  <span className="block">Turn Your Passion Into</span>
                  <span className="block text-teal-400">Meaningful Change</span>
                </h1>
                <p className="mt-6 text-base text-gray-500 sm:text-lg md:text-xl">
                  ActionConnect helps you discover social causes, connect with like-minded individuals, and provides
                  resources to take meaningful action.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button
                      asChild
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-teal-400 hover:bg-teal-500 md:py-4 md:text-lg md:px-10"
                    >
                      <Link to="/signup">
                        Get Started
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium border-navy-700 text-navy-700 hover:bg-navy-50 md:py-4 md:text-lg md:px-10"
                    >
                      <Link to="/about">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-navy-600 rounded-lg overflow-hidden">
                    <img
                      className="w-full opacity-75 object-cover h-64 lg:h-full"
                      src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="People working together on social causes"
                    />
                    <div className="absolute inset-0 bg-navy-700 mix-blend-multiply" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        to="/passion-finder"
                        className="relative rounded-md bg-teal-400 bg-opacity-90 px-6 py-3 text-white font-medium hover:bg-opacity-100 transition-all duration-300"
                      >
                        Find Your Passion
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-navy-700 sm:text-4xl">How ActionConnect Works</h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Our platform provides everything you need to discover, learn about, and take action on causes that
                matter to you.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="flex flex-col bg-white rounded-lg shadow-md transition-all hover:shadow-lg p-6 card-hover">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-teal-100 text-teal-400 mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-700">Content Library</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Access curated videos, documentaries, TED talks, books, reports, and articles updated daily to help
                    you learn about various social causes.
                  </p>
                  <div className="mt-4">
                    <Link
                      to="/content-library"
                      className="text-teal-400 hover:text-teal-500 font-medium flex items-center"
                    >
                      Browse the Library
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col bg-white rounded-lg shadow-md transition-all hover:shadow-lg p-6 card-hover">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-navy-100 text-navy-700 mb-4">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-700">Interactive Map</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Connect with like-minded individuals locally or globally who share your passion for similar causes
                    and collaborate on initiatives.
                  </p>
                  <div className="mt-4">
                    <Link to="/map" className="text-teal-400 hover:text-teal-500 font-medium flex items-center">
                      Explore the Map
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col bg-white rounded-lg shadow-md transition-all hover:shadow-lg p-6 card-hover">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-orange-100 text-orange-300 mb-4">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-700">Find Your Passion</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Discover causes that resonate with you through our interactive tool that helps match your interests
                    with social issues that need your help.
                  </p>
                  <div className="mt-4">
                    <Link
                      to="/passion-finder"
                      className="text-teal-400 hover:text-teal-500 font-medium flex items-center"
                    >
                      Take the Quiz
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col bg-white rounded-lg shadow-md transition-all hover:shadow-lg p-6 card-hover">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-red-100 text-red-500 mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-700">Action Hub</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Find links to NGOs, activist groups, scientific organizations, funding opportunities, and
                    educational resources to help turn your passion into action.
                  </p>
                  <div className="mt-4">
                    <Link to="/action-hub" className="text-teal-400 hover:text-teal-500 font-medium flex items-center">
                      Find Opportunities
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Feature 5 */}
                <div className="flex flex-col bg-white rounded-lg shadow-md transition-all hover:shadow-lg p-6 card-hover">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-teal-100 text-teal-400 mb-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-700">Community Chat</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Join discussions, collaborate on projects, and share ideas with a community of passionate
                    individuals working on various causes.
                  </p>
                  <div className="mt-4">
                    <Link to="/community" className="text-teal-400 hover:text-teal-500 font-medium flex items-center">
                      Join Discussions
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="flex flex-col bg-gradient-to-br from-navy-600 to-navy-800 rounded-lg shadow-md p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="text-navy-50 mb-6">
                    Join thousands of others who are already making a difference through ActionConnect.
                  </p>
                  <Button asChild className="bg-teal-400 hover:bg-teal-500 mt-auto">
                    <Link to="/signup">Create an Account</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-navy-700 sm:text-4xl">Success Stories</h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Hear from people who have used ActionConnect to make real change.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center">
                    <span className="text-navy-700 font-semibold">SD</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-navy-700">Sarah Davis</h4>
                    <p className="text-sm text-gray-500">Environmental Activist</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Through ActionConnect, I found a local community of people passionate about ocean conservation.
                  Together, we organized beach cleanups that removed over 2 tons of plastic waste."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 font-semibold">MJ</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-navy-700">Michael Johnson</h4>
                    <p className="text-sm text-gray-500">Education Advocate</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I was inspired by a documentary in the Content Library about education inequality. The Action Hub
                  connected me with a nonprofit where I now volunteer teaching underprivileged children."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">AL</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-navy-700">Aisha Lee</h4>
                    <p className="text-sm text-gray-500">Community Organizer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The Passion Finder quiz helped me realize I care deeply about food security. I connected with others
                  in my city and we started a community garden that now feeds dozens of families."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-navy-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to Make a Difference?</h2>
              <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto">
                Join ActionConnect today and start your journey toward creating meaningful change in the world.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button asChild className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-3">
                  <Link to="/signup">Create an Account</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-navy-600 px-6 py-3"
                >
                  <Link to="/passion-finder">Find Your Passion</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
