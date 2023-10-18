// permet d'executer la requete sql pour la table art

import executeQuery from "./executeQuery.js";

const artRepository = {
  list: (typeId) =>
    executeQuery(
      `
			SELECT id, image, title, type_id
			FROM artsphereai.art
			WHERE type_id = :typeId
			ORDER BY generation_date DESC LIMIT 4`,
      { typeId }
    ),

  // enregistre une image généré par l'ia
  create: (userId, userIp, title, image, typeId, generatedDate) =>
    executeQuery(
      `
			INSERT INTO artsphereai.art
			(user_id, user_ip, title, image, type_id, generation_date)
			VALUES (:userId, :userIp, :title, :image, :typeId, :generatedDate);
		`,
      { userId, userIp, title, image, typeId, generatedDate }
    ),

  // recupere la date de la derniere image généré par l'ia
  getLastGeneratedDate: (userIp) =>
    executeQuery(
      `
			SELECT MAX(generation_date) as generation_date
			FROM artsphereai.art
			WHERE user_ip = :userIp;
		`,
      { userIp }
    ).then((result) => result[0]),
};

export default artRepository;
