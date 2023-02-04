import React from "react";

export default function Home() {
  return (
    <>
      <aside className="h-full w-60 border-r border-[#1C1C1C]">
        <div className="display flex flex-col items-center space-y-4 border-b border-[#1C1C1C] p-4">
          <img
            src="https://lh3.googleusercontent.com/fife/AMPSemfTC6m-1EenCHoZ5te5r3CAESIh_xR1lhS5YAJWY4OrKP-zkdmVt7POzYExRU1aF0HpbqqJJgOuXg2jePPDURWEWVjLaUIcrSM_sTBpj6iMPoWKqdBWYMbbZIq5buf_S2L2F6iYY2bgxtVFS_dyspun0tuWmFs-zHjjKCM0iB9K_TRvClRIUeeDNNftr_9-MopBna5SsxGiHSI2b-tjlmsBQPgmCsRMB0gSuhU9Q9RayzQNJSQnxFrV7Tinj0Wy1dJCpYKQ-qH_JF-Yyr_3cNPZE1k-SH9Zl3tTKOCDBSMb_y_QmasIOCIhO3d9ZJMV2yaOa8gMfHuswdc4BsBxkDVlIRISVBSPFslM3wjBi5yt8QzbVindv1pESikIyX2JtohEAvXA0LI5VVM70LWFu1kni7LrhM7S5XxbzckyK_9-NP-q3EH1WoG2taPu1g4JYtmPW8zM6GuwwXbTOr7bOisHvrmVojWTWOUDFywMMX7iA7Ixt10sHhrMW-o8DkuaEf6fMtCjtCouP_SgTbavPU7806y3PSmBb94hipfv-197bvXymHUO-p_c_aghFnmDTc5zGmGJ_jxMN0D8E4rKMw8_P6E4JzYOpk44p9IYsI02vz92-KCfa4g7vPLP1Ol8ui1ZKennOUMz9932gL1HNf07AyP6ku18Gnf-sLh-bdm1XE03o9gWJnxGjl1NPlJUJriTKiU8Uoe6uUexswtzqHxF2NCMtspjONKgJWizWetjw3eIb5-1zBiGVQAKmNHCwq_H0ZotwjuJn1Fl66tXT_5adImi4aMyIuUthQ1R5SC3qw1hcX6pi4KSu4Hs4jIC9lOv5V7bg3nuxehu3Mqn8A5RenOUT3RkYsm2XC10Hs46CFV14TJ9gBF3XPPAWC7u9dz9E2qwo75fCh8t25_9ftgb4vJ5K-lVZhpBUAPDtH5uOcYKIJ3GFYiutRurWHqmavMxQ64ar0ynys3nG9f6a56QtjzevTi92UcAbMDodQWAeV3tqf1h5XRfscBld7phf-GA27jJvaEMolzmcypoTLVUJx9VNbxed9tX_bqII4KJlm2y-3HwxINFQDCyUZlZ7vZzGQurUrkbhM2TzsRflH5ItT1w_RCgmBHjDfUWXsOvM594xa8CHaY=w1920-h969"
            className="w-24 rounded"
          />
          <div className="space-y-1 text-center">
            <h1 className="text-xl">Umut Kızıloğlu</h1>
            <h2 className="text-sm text-white text-opacity-75">
              Full-Stack Developer
            </h2>
          </div>
        </div>
        <div className="h-[38rem] w-full">
          <ul className="w-full divide-y divide-dashed divide-[#1c1c1c]">
            <li className="items">
              <a href="#">About Me</a>
            </li>
            <li></li>
            <li className="items">
              <a href="#">Projects</a>
            </li>
            <li></li>
            <li></li>
            <li className="items">
              <a href="#">Technologies</a>
            </li>
            <li></li>
          </ul>
        </div>
        <div></div>
        <div className="flex h-[6.53rem] w-full items-center space-x-3 border-t border-[#1C1C1C] p-1 px-2">
          <div className="h-[4rem] w-[4rem] rounded bg-white/10"></div>
          <div className="h-16">
            <span className="text-sm">Lorem ipsum.</span>
            <br />
            <span className="text-xs">Lorem Ipsum</span>
          </div>
        </div>
      </aside>
      <main className="w-full"></main>
    </>
  );
}
