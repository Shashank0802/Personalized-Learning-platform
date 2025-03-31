import {
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  CloudIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon as MobileIcon,
  CurrencyDollarIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export const topics = [
  {
    icon: CodeBracketIcon,
    title: "Programming Languages",
    description: "Master popular programming languages including Python, Java, C++, and JavaScript with comprehensive tutorials and examples.",
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-600 to-blue-700",
    link: "/programming-languages",
    content: {
      overview: `Programming languages are the foundation of software development. Learn how to write efficient, maintainable, and scalable code in various programming languages.

Key Areas:
• Python: Data science, web development, automation
• Java: Enterprise applications, Android development
• C++: System programming, game development
• JavaScript: Web development, Node.js, React
• TypeScript: Type-safe JavaScript, Angular
• Go: Cloud-native applications, microservices
• Rust: Systems programming, performance-critical applications`,

      examples: [
        {
          title: "Python - Basic Syntax",
          code: `# Variables and data types
name = "John"
age = 25
is_student = True

# Lists and dictionaries
fruits = ["apple", "banana", "orange"]
person = {
    "name": "John",
    "age": 25,
    "city": "New York"
}

# Functions
def greet(name):
    return f"Hello, {name}!"

# Classes
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"I am {self.name}, {self.age} years old."`
        },
        {
          title: "JavaScript - Modern Features",
          code: `// Arrow functions
const add = (a, b) => a + b;

// Destructuring
const { name, age, ...rest } = person;

// Async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Classes
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    getInfo() {
        return this.name + " (" + this.email + ")";
    }
}`
        }
      ]
    }
  },
  {
    icon: CommandLineIcon,
    title: "CS Fundamentals",
    description: "Master core computer science concepts including Operating Systems, DBMS, and Computer Networks.",
    color: "from-purple-500 to-purple-600",
    hoverColor: "from-purple-600 to-purple-700",
    link: "/cs-fundamentals",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: CpuChipIcon,
    title: "AI & Machine Learning",
    description: "Explore Deep Learning, NLP, and Reinforcement Learning with practical examples and projects.",
    color: "from-green-500 to-green-600",
    hoverColor: "from-green-600 to-green-700",
    link: "/ai-ml",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: ChartBarIcon,
    title: "Data Science",
    description: "Master data analysis with Pandas, NumPy, and learn to create stunning visualizations.",
    color: "from-red-500 to-red-600",
    hoverColor: "from-red-600 to-red-700",
    link: "/data-science",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Internet of Things",
    description: "Learn about embedded systems, MQTT protocols, and building connected devices.",
    color: "from-yellow-500 to-yellow-600",
    hoverColor: "from-yellow-600 to-yellow-700",
    link: "/iot",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: ShieldCheckIcon,
    title: "Cyber Security",
    description: "Master cryptography, ethical hacking, and network security best practices.",
    color: "from-indigo-500 to-indigo-600",
    hoverColor: "from-indigo-600 to-indigo-700",
    link: "/cybersecurity",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: CircleStackIcon,
    title: "Data Structures & Algorithms",
    description: "Learn essential data structures and algorithms with interactive visualizations.",
    color: "from-pink-500 to-pink-600",
    hoverColor: "from-pink-600 to-pink-700",
    link: "/dsa",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: CloudIcon,
    title: "Cloud Computing",
    description: "Master cloud platforms like AWS, GCP, and Azure with hands-on projects.",
    color: "from-cyan-500 to-cyan-600",
    hoverColor: "from-cyan-600 to-cyan-700",
    link: "/cloud",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: GlobeAltIcon,
    title: "Web Development",
    description: "Learn modern web development with HTML, CSS, JavaScript, React, and Node.js.",
    color: "from-orange-500 to-orange-600",
    hoverColor: "from-orange-600 to-orange-700",
    link: "/web-dev",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: MobileIcon,
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps with Flutter, Android, and iOS development.",
    color: "from-teal-500 to-teal-600",
    hoverColor: "from-teal-600 to-teal-700",
    link: "/mobile-dev",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: CurrencyDollarIcon,
    title: "Blockchain & Web3",
    description: "Learn about smart contracts, Ethereum, and building decentralized applications.",
    color: "from-emerald-500 to-emerald-600",
    hoverColor: "from-emerald-600 to-emerald-700",
    link: "/blockchain",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  },
  {
    icon: RocketLaunchIcon,
    title: "DevOps & CI/CD",
    description: "Master containerization, orchestration, and continuous integration/deployment.",
    color: "from-violet-500 to-violet-600",
    hoverColor: "from-violet-600 to-violet-700",
    link: "/devops",
    content: {
      overview: "Coming soon...",
      examples: []
    }
  }
]; 