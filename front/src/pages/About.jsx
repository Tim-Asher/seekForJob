import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* Container */}
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-orange-500 mb-4 text-center">
          אודות
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          !ברוכים הבאים לאתר שלנו, הפלטפורמה שמנגישה את חיפוש העבודה
        </p>

        {/* Team Section */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-10">
          <div className="w-full md:w-3/5 mb-6 md:mb-0 px-4 text-center md:text-right">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              הצוות שלנו
            </h2>
            <p className="text-gray-600 leading-relaxed text-xl">
              אנחנו ארבעה אנשי צוות נלהבים, שלקחנו על עצמנו את המשימה להקל על
              עובדים ומעסיקים בתהליך חיפוש העבודה. במסגרת פרויקט הסיום שלנו,
              יצרנו אתר המאפשר חיפוש משרות בצורה פשוטה, נוחה וידידותית למשתמש
            </p>
            <p className="text-gray-800 font-semibold mt-4 text-xl">
              טים אשר (ראש הצוות), נתנאל מליני, עמיחי בוסקילה ואביגיל אהרון
              פריאב
            </p>
          </div>
          <div className="w-full md:w-2/5 px-4 ">
            <img
              src="/images/jobSeekLogoNew.png"
              alt="JobSeek"
              className="h-full w-full"
              onClick={() => {
                navigate("/thank-you");
              }}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-10 text-right">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            הכלים שלנו
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gray-50 shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                יצירת קורות חיים
              </h3>
              <p className="text-gray-600">
                הכלי שלנו ליצירת קורות חיים מאפשר לך לעצב מסמך מקצועי בלחיצת
                כפתור
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                צפייה במשרות
              </h3>
              <p className="text-gray-600">
                חיפוש מהיר ופשוט במגוון רחב של משרות המתעדכנות בזמן אמת
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                ממשק מעסיקים
              </h3>
              <p className="text-gray-600">
                מקום נוח למעסיקים להעלות משרות ולנהל תהליכי גיוס
              </p>
            </div>

            {/* Feature 4 - Employer Ratings */}
            <div className="bg-gray-50 shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                דירוג מעסיקים
              </h3>
              <p className="text-gray-600">
                באתר שלנו תוכל לצפות בדירוגים ותגובות של משתמשים אחרים על תהליכי
                הגיוס והעבודה במגוון חברות
              </p>
            </div>

            {/* Feature 5 - Application Tracking */}
            <div className="bg-gray-50 shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                מעקב אחרי תהליך המיון
              </h3>
              <p className="text-gray-600">
                מעקב אחר סטטוס המועמדות שלך בצורה מדויקת, כדי לדעת באיזה שלב אתה
                בתהליך המיון לכל משרה
              </p>
            </div>

            {/* Feature 6 - Feedback on Interviews */}
            <div className="bg-gray-50 shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                השארת תגובות על תהליך המיון
              </h3>
              <p className="text-gray-600">
                שתף את החוויה שלך בתהליך המיון על מנת לעזור לאחרים להתכונן
                ולהבין מה מצפה להם בחברה מסוימת
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            החזון שלנו
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            החזון שלנו הוא ליצור חוויית חיפוש עבודה נגישה, אינטואיטיבית ומותאמת
            אישית לצרכים של כל משתמש, בין אם אתה מחפש עבודה או מעסיק שמחפש את
            הכישרון הבא
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
