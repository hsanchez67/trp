package com.latch.service.feign.fallback;

import java.util.Collection;

import org.springframework.hateoas.PagedResources;

import com.latch.domain.CommunicationDTO;
import com.latch.service.feign.CommunicationServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommunicationServiceClientFallbackHandler implements CommunicationServiceClient {
	@Override

	public CommunicationDTO create(CommunicationDTO dto) {
		log.warn("Exception calling communication-service.create({}) - circuit open", dto);
		return null;
	}

	@Override
	public void send(CommunicationDTO... dto) {
		log.warn("Exception calling communication-service.send({}) - circuit open", (Object[]) dto);
	}

	@Override
	public PagedResources<CommunicationDTO> getMessagesTo(String userid, String transactionType, int page, int size, String sort) {
		log.warn("Exception calling communication-service.getMessagesTo({}, {}, {}, {}, {}) - circuit open", userid, transactionType, page,
				size, sort);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> getMessagesFrom(String userid, String transactionType, int page, int size, String sort) {
		log.warn("Exception calling communication-service.getMessagesFrom({}, {}, {}, {}, {}) - circuit open", userid, transactionType, page,
				size, sort);
		return null;
	}

	@Override
	public CommunicationDTO getMessageById(String messageid) {
		log.warn("Exception calling communication-service.getMessageById({}) - circuit open", messageid);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> findByToUserIdAndTransactionType(String toUserid, String transactionType,
																	  int page, int size, String sort) {
		log.warn("Exception calling communication-service.findByToUserIdAndTransactionType({}, {}, {}, {}, {}) - circuit open",
				toUserid, transactionType, page, size, sort);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> findByToUserIdAndStatusIn(String toUserid, Collection<String> status,
			int page, int size, String sort) {
		log.warn("Exception calling communication-service.findByToUserIdAndStatusIn({}, {}, {}, {}, {}) - circuit open",
				toUserid, status, page, size, sort);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> findByToUserIdAndStatusNotIn(String toUserid, Collection<String> status,
			int page, int size, String sort) {
		log.warn(
				"Exception calling communication-service.findByToUserIdAndStatusNotIn({}, {}, {}, {}, {}) - circuit open",
				toUserid, status, page, size, sort);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> findByFromUserIdAndStatusIn(String fromUserid, Collection<String> status,
			int page, int size, String sort) {
		log.warn(
				"Exception calling communication-service.findByFromUserIdAndStatusIn({}, {}, {}, {}, {}) - circuit open",
				fromUserid, status, page, size, sort);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusIn(String userid,
			Collection<String> status, int page, int size, String sort) {
		log.warn(
				"Exception calling communication-service.findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusIn({}, {}, {}, {}, {}) - circuit open",
				userid, status, page, size, sort);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusNotIn(String userid,
			Collection<String> status, int page, int size, String sort) {
		log.warn(
				"Exception calling communication-service.findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusNotIn({}, {}, {}, {}, {}) - circuit open",
				userid, status, page, size, sort);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> findByFromUserIdAndStatusNotIn(String fromUserid, Collection<String> status,
			int page, int size, String sort) {
		log.warn(
				"Exception calling communication-service.findByFromUserIdAndStatusNotIn({}, {}, {}, {}, {}) - circuit open",
				fromUserid, status, page, size, sort);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> findByTwoUsersAndStatusIn(String userid1, String userid2,
			Collection<String> transactionType, Collection<String> status, int page, int size, String sort) {
		log.warn(
				"Exception calling communication-service.findByTwoUsersAndStatusIn({}, {}, {}, {}, {}, {}, {}) - circuit open",
				userid1, userid2, transactionType, status, page, size, sort);
		return null;
	}

	@Override
	public PagedResources<CommunicationDTO> findByTwoUsersAndStatusNotIn(String userid1, String userid2,
			Collection<String> transactionType, Collection<String> status, int page, int size, String sort) {
		log.warn(
				"Exception calling communication-service.findByTwoUsersAndStatusNotIn({}, {}, {}, {}, {}, {}, {}) - circuit open",
				userid1, userid2, transactionType, status, page, size, sort);
		return null;
	}

	@Override
	public void updateStatus(String messageid, String status) {
		log.warn("Exception calling communication-service.updateStatus({}, {}) - circuit open", messageid, status);

	}

	@Override
	public void delete(String messageid) {
		log.warn("Exception calling communication-service.delete({}) - circuit open", messageid);

	}
}
