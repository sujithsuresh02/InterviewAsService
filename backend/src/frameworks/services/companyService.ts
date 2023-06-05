import { getDocument } from "pdfjs-dist/legacy/build/pdf";
// import cohere = require("cohere-ai");
import { Configuration, OpenAIApi } from "openai";
import configKeys from "../../config";
import { studentDetails } from "../../types/companyInterfaceTypes";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";
export const companyServiceImplementation = () => {
  const extractData = async (path: string) => {
    console.log("path");
    console.log(path);

    try {
      const pdf = await getDocument(path).promise;
      const numPages = pdf.numPages;

      let fullText = "";
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join("");
        fullText += pageText;
      }
      console.log(fullText);
      return categorizeMixedData(fullText).then((result) => {
        console.log(result);

        return result;
      });
    } catch (error: any) {
      throw new AppError(error, HttpStatus.BAD_REQUEST);
    }
    return;
  };

  const configuration = new Configuration({
    apiKey: configKeys.OPEN_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const categorizeMixedData = async (data: string) => {
    try {
      const prompt = `Categorize the following text:\n${data}\n into following json format{
        "name": "",
        "email": "",
        "phone": "",
        "experience": "",
        "skills": "",
        "education": "",
        "projects": "",
        "address": "",
        "sex": "",
        "age": "",
        "certifications": ""
      } takes the project and skill field only the important values donote take full data
      `;

      return await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 1000,
        })
        .then((response) => {

          const jsonString: any = response.data.choices[0].text?.trim();
          console.log(jsonString);
          return jsonString;
        });
    } catch (error) {
      console.error("Error categorizing mixed data:", error);
    }
  };

  return {
    extractData,
  };
};
export type companyDbServiceImplementation =
  typeof companyServiceImplementation;
