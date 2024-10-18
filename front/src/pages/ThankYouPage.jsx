import React from "react";

const ThankYouPage = () => {
  return (
    <div className="w-full flex justify-center items-center text-center">
      <div className="container">
        <div className="flex flex-col justify-center items-center text-center py-6">
          <h1 className="font-bold text-2xl">
            ברצוננו להודות לכם מקרב לב על שהקדשתם מזמנכם לצפות בפרויקט שלנו
            <br />
            ההערכה והמשוב שלכם חשובים לנו מאוד, ויתרמו רבות להמשך השיפור
            וההתפתחות שלנו
            <br />
            אנחנו מעריכים את התמיכה שלכם ושמחים שזכינו לשתף אתכם בתהליך
            <br />
            תודה רבה
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <MyCard
            name={"Tim Asher"}
            qrCodeImage={"/images/tim-asher-linkedin-1024.jpg"}
          />
          <MyCard
            name={"Netanel Malini"}
            qrCodeImage={"/images/netanel-malini-linkedin-1024.jpg"}
          />
        </div>
        <div className="flex justify-center">
          <MyCard
            name={"Amihai Bouskila"}
            qrCodeImage={"/images/amihai-bouskila-linkedin-1024.jpg"}
          />
          <MyCard
            name={"Avigail Aharon Priev"}
            qrCodeImage={"/images/avigail-linkedin-1024.jpg"}
          />
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

function MyCard({ qrCodeImage, name }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg font-bold underline">{name}</p>
      <img className="w-2/4" src={qrCodeImage} alt="qrCodes" />
    </div>
  );
}
