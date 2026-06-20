export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container max-w-4xl mx-auto text-center">
        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          © {new Date().getFullYear()} Ankur Sharma. All Rights Reserved.
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
          Built with React.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
