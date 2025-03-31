import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CodeBracketIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  CommandLineIcon,
  CpuChipIcon,
  BeakerIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  SparklesIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

interface Language {
  id: string
  name: string
  icon: string
  description: string
  topics: {
    id: string
    name: string
    subtopics: {
      id: string
      name: string
      content: string
    }[]
  }[]
}

const languages: Language[] = [
  {
    id: 'python',
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    description: 'A versatile, high-level programming language known for its simplicity and readability',
    topics: [
      {
        id: 'basics',
        name: 'Basic Concepts',
        subtopics: [
          {
            id: 'variables',
            name: 'Variables & Data Types',
            content: 'Learn about Python variables, data types, and type conversion.'
          },
          {
            id: 'control-flow',
            name: 'Control Flow',
            content: 'Master if statements, loops, and control structures in Python.'
          },
          {
            id: 'functions',
            name: 'Functions',
            content: 'Understanding function definition, parameters, and return values.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Topics',
        subtopics: [
          {
            id: 'oop',
            name: 'Object-Oriented Programming',
            content: 'Classes, objects, inheritance, and polymorphism in Python.'
          },
          {
            id: 'modules',
            name: 'Modules & Packages',
            content: 'Working with Python modules, packages, and importing.'
          },
          {
            id: 'decorators',
            name: 'Decorators & Generators',
            content: 'Advanced Python features like decorators and generators.'
          }
        ]
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    description: 'The language of the web, enabling interactive and dynamic web applications',
    topics: [
      {
        id: 'basics',
        name: 'Basic Concepts',
        subtopics: [
          {
            id: 'variables',
            name: 'Variables & Data Types',
            content: 'Understanding JavaScript variables, data types, and type coercion.'
          },
          {
            id: 'control-flow',
            name: 'Control Flow',
            content: 'Master if statements, loops, and control structures in JavaScript.'
          },
          {
            id: 'functions',
            name: 'Functions',
            content: 'Function declarations, expressions, and arrow functions.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Topics',
        subtopics: [
          {
            id: 'async',
            name: 'Asynchronous Programming',
            content: 'Promises, async/await, and handling asynchronous operations.'
          },
          {
            id: 'dom',
            name: 'DOM Manipulation',
            content: 'Working with the Document Object Model in JavaScript.'
          },
          {
            id: 'es6',
            name: 'ES6+ Features',
            content: 'Modern JavaScript features and syntax improvements.'
          }
        ]
      }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    description: 'A robust, object-oriented programming language for enterprise applications',
    topics: [
      {
        id: 'basics',
        name: 'Basic Concepts',
        subtopics: [
          {
            id: 'variables',
            name: 'Variables & Data Types',
            content: 'Understanding Java variables, data types, and type casting.'
          },
          {
            id: 'control-flow',
            name: 'Control Flow',
            content: 'Master if statements, loops, and control structures in Java.'
          },
          {
            id: 'methods',
            name: 'Methods',
            content: 'Method declarations, parameters, and return types in Java.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Topics',
        subtopics: [
          {
            id: 'oop',
            name: 'Object-Oriented Programming',
            content: 'Classes, objects, inheritance, and polymorphism in Java.'
          },
          {
            id: 'collections',
            name: 'Collections Framework',
            content: 'Working with Java collections and data structures.'
          },
          {
            id: 'exceptions',
            name: 'Exception Handling',
            content: 'Understanding and implementing exception handling in Java.'
          }
        ]
      }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    description: 'A powerful systems programming language that extends C with object-oriented features',
    topics: [
      {
        id: 'basics',
        name: 'Basic Concepts',
        subtopics: [
          {
            id: 'variables',
            name: 'Variables & Data Types',
            content: 'Understanding C++ variables, data types, and type casting.'
          },
          {
            id: 'control-flow',
            name: 'Control Flow',
            content: 'Master if statements, loops, and control structures in C++.'
          },
          {
            id: 'functions',
            name: 'Functions',
            content: 'Function declarations, overloading, and templates in C++.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Topics',
        subtopics: [
          {
            id: 'oop',
            name: 'Object-Oriented Programming',
            content: 'Classes, objects, inheritance, and polymorphism in C++.'
          },
          {
            id: 'stl',
            name: 'Standard Template Library',
            content: 'Working with STL containers, algorithms, and iterators.'
          },
          {
            id: 'memory',
            name: 'Memory Management',
            content: 'Understanding pointers, references, and smart pointers.'
          }
        ]
      }
    ]
  },
  {
    id: 'c',
    name: 'C',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    description: 'A low-level programming language known for its efficiency and direct hardware access',
    topics: [
      {
        id: 'basics',
        name: 'Basic Concepts',
        subtopics: [
          {
            id: 'variables',
            name: 'Variables & Data Types',
            content: 'Understanding C variables, data types, and type casting.'
          },
          {
            id: 'control-flow',
            name: 'Control Flow',
            content: 'Master if statements, loops, and control structures in C.'
          },
          {
            id: 'functions',
            name: 'Functions',
            content: 'Function declarations, parameters, and return values in C.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Topics',
        subtopics: [
          {
            id: 'pointers',
            name: 'Pointers & Memory',
            content: 'Understanding pointers, memory allocation, and management.'
          },
          {
            id: 'structs',
            name: 'Structures & Unions',
            content: 'Working with structures, unions, and data organization.'
          },
          {
            id: 'files',
            name: 'File Handling',
            content: 'File I/O operations and stream handling in C.'
          }
        ]
      }
    ]
  },
  {
    id: 'go',
    name: 'Go',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    description: 'A modern programming language known for its simplicity and excellent concurrency support',
    topics: [
      {
        id: 'basics',
        name: 'Basic Concepts',
        subtopics: [
          {
            id: 'variables',
            name: 'Variables & Data Types',
            content: 'Understanding Go variables, data types, and type inference.'
          },
          {
            id: 'control-flow',
            name: 'Control Flow',
            content: 'Master if statements, loops, and control structures in Go.'
          },
          {
            id: 'functions',
            name: 'Functions',
            content: 'Function declarations, multiple return values, and methods.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Topics',
        subtopics: [
          {
            id: 'concurrency',
            name: 'Concurrency',
            content: 'Goroutines, channels, and concurrent programming in Go.'
          },
          {
            id: 'interfaces',
            name: 'Interfaces',
            content: 'Understanding interfaces and type assertions in Go.'
          },
          {
            id: 'testing',
            name: 'Testing',
            content: 'Writing and running tests in Go.'
          }
        ]
      }
    ]
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
    description: 'A systems programming language focused on safety, concurrency, and performance',
    topics: [
      {
        id: 'basics',
        name: 'Basic Concepts',
        subtopics: [
          {
            id: 'variables',
            name: 'Variables & Data Types',
            content: 'Understanding Rust variables, data types, and ownership.'
          },
          {
            id: 'control-flow',
            name: 'Control Flow',
            content: 'Master if statements, loops, and control structures in Rust.'
          },
          {
            id: 'functions',
            name: 'Functions',
            content: 'Function declarations, parameters, and return values in Rust.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Topics',
        subtopics: [
          {
            id: 'ownership',
            name: 'Ownership & Borrowing',
            content: 'Understanding Rust\'s ownership system and borrowing rules.'
          },
          {
            id: 'lifetimes',
            name: 'Lifetimes',
            content: 'Working with lifetimes and references in Rust.'
          },
          {
            id: 'traits',
            name: 'Traits & Generics',
            content: 'Understanding traits, generics, and type parameters.'
          }
        ]
      }
    ]
  },
  {
    id: 'swift',
    name: 'Swift',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    description: 'A modern programming language for iOS, macOS, watchOS, and tvOS development',
    topics: [
      {
        id: 'basics',
        name: 'Basic Concepts',
        subtopics: [
          {
            id: 'variables',
            name: 'Variables & Data Types',
            content: 'Understanding Swift variables, data types, and optionals.'
          },
          {
            id: 'control-flow',
            name: 'Control Flow',
            content: 'Master if statements, loops, and control structures in Swift.'
          },
          {
            id: 'functions',
            name: 'Functions',
            content: 'Function declarations, parameters, and return values in Swift.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Topics',
        subtopics: [
          {
            id: 'classes',
            name: 'Classes & Structures',
            content: 'Understanding classes, structures, and protocols in Swift.'
          },
          {
            id: 'extensions',
            name: 'Extensions & Protocols',
            content: 'Working with extensions and protocol-oriented programming.'
          },
          {
            id: 'closures',
            name: 'Closures',
            content: 'Understanding closures and their use in Swift.'
          }
        ]
      }
    ]
  }
]

export default function ProgrammingLanguages() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [expandedTopics, setExpandedTopics] = useState<string[]>([])
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    language.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ top: '10%', left: '10%' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ bottom: '10%', right: '10%' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
                Programming Languages
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Master the most in-demand programming languages and frameworks
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-white placeholder-gray-400"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Language List */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Languages</h2>
              <div className="space-y-2">
                {filteredLanguages.map((language) => (
                  <motion.button
                    key={language.id}
                    onClick={() => setSelectedLanguage(language.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      selectedLanguage === language.id
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={language.icon}
                      alt={language.name}
                      className="w-6 h-6"
                    />
                    <span>{language.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Topics and Content */}
          <div className="lg:col-span-9">
            {selectedLanguage ? (
              <div className="space-y-8">
                {languages
                  .find((lang) => lang.id === selectedLanguage)
                  ?.topics.map((topic) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                    >
                      <button
                        onClick={() => toggleTopic(topic.id)}
                        className="w-full flex items-center justify-between text-white hover:text-primary-400 transition-colors"
                      >
                        <h3 className="text-lg font-semibold">{topic.name}</h3>
                        {expandedTopics.includes(topic.id) ? (
                          <ChevronDownIcon className="w-5 h-5" />
                        ) : (
                          <ChevronRightIcon className="w-5 h-5" />
                        )}
                      </button>

                      {expandedTopics.includes(topic.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-4"
                        >
                          {topic.subtopics.map((subtopic) => (
                            <motion.div
                              key={subtopic.id}
                              whileHover={{ scale: 1.02 }}
                              className={`p-4 rounded-lg cursor-pointer transition-all ${
                                selectedSubtopic === subtopic.id
                                  ? 'bg-primary-500/20 text-primary-400'
                                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                              }`}
                              onClick={() => setSelectedSubtopic(subtopic.id)}
                            >
                              <h4 className="font-medium">{subtopic.name}</h4>
                              <p className="text-sm mt-1">{subtopic.content}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
                <CodeBracketIcon className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Select a Programming Language
                </h3>
                <p className="text-gray-300">
                  Choose a language from the sidebar to start learning
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 