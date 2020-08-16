import { Response, Request, NextFunction } from "express";
import csgo from "csgo";
import { csgoClient } from "../server";

export interface IDecodedShareCode {
  matchId: string;
  outcomeId: string;
  tokenId: string;
}

const getMatchData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const shareCodeParam = req.params.shareCode;

  const shareCode = new csgo.SharecodeDecoder(shareCodeParam);
  const decodedShareCode: IDecodedShareCode = shareCode.decode();
  console.log("DECODE:", decodedShareCode);

  const matchID = decodedShareCode.matchId;
  const outcomeID = decodedShareCode.outcomeId;
  const tokenID = parseInt(decodedShareCode.tokenId);

  // Launch CSGO Client to start talking with CSGO GameCoordinator
  csgoClient.launch();

  // CSGO Client is ready to send/recieved messages
  csgoClient.on("ready", function fetchData() {
    // Send message to get match data
    csgoClient.requestGame(matchID, outcomeID, tokenID);

    // Match data recieved
    csgoClient.on("matchList", function matchData(data) {
      // Send match data as JSON response back to client
      res.json(data);

      // Clear "matchList" event handler
      csgoClient.removeListener("matchList", matchData);
    });

    // Close CSGO Client
    csgoClient.exit();

    // Clear "ready" event handler
    csgoClient.removeListener("ready", fetchData);
  });
};

export default {
  getMatchData
};
