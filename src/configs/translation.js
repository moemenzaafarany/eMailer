// class
// json
import en from "../assets/locales/en.json";
import { eLocale, eInitTranslation } from "react-e-utils";
//==============================< Translation Class
eInitTranslation(
  [new eLocale("en", "ltr", "English", ["'Inconsolata'", "sans-serif"], en)],
  {
    fillerTag: "<?>",
    autoDetect: false,
    defaultLocale: "en",
  }
);
