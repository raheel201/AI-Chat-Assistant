# AI Chat Assistant

A modern, full-stack AI-powered chat application built with Next.js 16, featuring real-time conversations, authentication, and extensible AI tools.

## Features

- **AI-Powered Chat**: Integration with Google's Generative AI (Gemini) via the Vercel AI SDK
- **User Authentication**: Secure authentication with NextAuth.js supporting multiple providers
- **Real-time Chat Interface**: Modern, responsive UI built with React and shadcn/ui components
- **Extensible Tools System**: Support for external tools (e.g., weather API integration)
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Dark Mode**: Built-in theme support with next-themes
- **Type-Safe**: Full TypeScript support with strict type checking
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS v4

## Tech Stack

### Frontend
- **Framework**: Next.js 16.0.6 (App Router)
- **UI Library**: React 19.2.0 with shadcn/ui components
- **Styling**: Tailwind CSS v4 with PostCSS
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode support

### Backend & Services
- **Authentication**: NextAuth.js 4.24.13 with Drizzle adapter
- **AI**: Vercel AI SDK with Google Generative AI
- **Database**: PostgreSQL with Drizzle ORM
- **HTTP Client**: Axios
- **Validation**: Zod

### Development
- **Language**: TypeScript 5
- **Linting**: ESLint 9
- **Package Manager**: npm
- **Database Migrations**: Drizzle Kit

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── chat/         # Chat API endpoints
│   │   └── tools/        # Tool implementations (e.g., weather)
│   ├── chat/              # Chat page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Login page
│   ├── globals.css        # Global styles
│   └── middleware.ts      # Authentication middleware
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ChatInterface.tsx  # Main chat component
│   └── theme-provider.tsx # Theme provider
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   └── utils.ts          # Helper utilities
├── db/                    # Database configuration
├── types/                 # TypeScript type definitions
└── public/                # Static assets

drizzle/                   # Database migrations
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Google AI API key
- (Optional) GitHub OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-chat-assistant
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Then configure your `.env.local`:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ai-chat-db

# AI
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-key

# NextAuth
NEXTAUTH_SECRET=your-generated-secret-key
NEXTAUTH_URL=http://localhost:3000

# OAuth (optional)
GITHUB_ID=your-github-oauth-id
GITHUB_SECRET=your-github-oauth-secret

# APIs
OPENWEATHER_API_KEY=your-openweather-api-key
```

### Database Setup

Generate and apply database migrations:
```bash
npm run db:generate
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:
```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Apply database migrations

## Key Components

### ChatInterface
The main chat component handling:
- Message input and display
- Real-time streaming responses
- Tool invocation
- Message history

### Authentication
- User registration and login
- Session management
- Protected routes (chat page requires authentication)
- Automatic redirect to login for unauthenticated users

### AI Integration
- Google Generative AI (Gemini) as the primary AI model
- Support for function calling and tool use
- Streaming responses for real-time chat experience

### Tools System
Extensible tool system for AI capabilities:
- **Weather Tool**: Fetches weather data via OpenWeatherMap API
- Easy to extend with new tools

## Future Enhancements

- [ ] User message history persistence
- [ ] Chat context management
- [ ] Multi-model support
- [ ] Advanced tool ecosystem
- [ ] File upload support
- [ ] Voice input/output
- [ ] Conversation sharing
- [ ] Custom AI configurations

## Error Handling

The application includes comprehensive error handling:
- API error responses with meaningful messages
- Weather tool location validation
- Authentication errors and redirects
- Type-safe error handling with Zod validation

## Contributing

Contributions are welcome! Please ensure:
- TypeScript type safety
- ESLint compliance
- Proper error handling
- Clear commit messages

## License

[Add your license here]

## Support

For issues and questions, please create an issue in the repository.
