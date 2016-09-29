package com.latch.service.feign;

import java.util.Collection;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.latch.domain.CommunicationDTO;
import com.latch.service.feign.fallback.CommunicationServiceClientFallbackHandler;

@FeignClient(name = "communication-service", decode404 = true, fallback = CommunicationServiceClientFallbackHandler.class)
public interface CommunicationServiceClient {

	@RequestMapping(value = "/communications/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	CommunicationDTO create(CommunicationDTO dto);

	@RequestMapping(value = "/communications/send", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	void send(CommunicationDTO... dto);

	@RequestMapping(value = "/communications/to/{userid}", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> getMessagesTo(@PathVariable("userid") String userid,
			@RequestParam("transactionType") String transactionType, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/from/{userid}", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> getMessagesFrom(@PathVariable("userid") String userid,
			@RequestParam("transactionType") String transactionType, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/{messageid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	CommunicationDTO getMessageById(@PathVariable("messageid") String messageid);

	@RequestMapping(value = "/communications/search/findByToUserIdAndTransactionType", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> findByToUserIdAndTransactionType(@RequestParam("toUserId") String toUserid,
															   @RequestParam("transactionType") String transactionType, @RequestParam("page") int page, @RequestParam("size") int size,
															   @RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/search/findByToUserIdAndStatusIn", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> findByToUserIdAndStatusIn(@RequestParam("toUserId") String toUserid,
			@RequestParam("status") Collection<String> status, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/search/findByToUserIdAndStatusNotIn", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> findByToUserIdAndStatusNotIn(@RequestParam("toUserId") String toUserid,
			@RequestParam("status") Collection<String> status, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);
	
	@RequestMapping(value = "/communications/search/findByFromUserIdAndStatusIn", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> findByFromUserIdAndStatusIn(@RequestParam("fromUserId") String fromUserid,
			@RequestParam("status") Collection<String> status, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/search/findByFromUserIdAndStatusNotIn", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> findByFromUserIdAndStatusNotIn(@RequestParam("fromUserId") String fromUserid,
			@RequestParam("status") Collection<String> status, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/search/findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusIn", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusIn(@RequestParam("userId") String userid,
			@RequestParam("status") Collection<String> status, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/search/findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusNotIn", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusNotIn(@RequestParam("userId") String userid,
			@RequestParam("status") Collection<String> status, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/search/findByTwoUsersAndStatusIn", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> findByTwoUsersAndStatusIn(@RequestParam("userId1") String userid1,
			@RequestParam("userId2") String userid2, @RequestParam("transactionType") Collection<String> transactionType,
			@RequestParam("status") Collection<String> status, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/search/findByTwoUsersAndStatusNotIn", method = RequestMethod.GET)
	PagedResources<CommunicationDTO> findByTwoUsersAndStatusNotIn(@RequestParam("userId1") String userid1,
			@RequestParam("userId2") String userid2, @RequestParam("transactionType") Collection<String> transactionType,
			@RequestParam("status") Collection<String> status, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);

	@RequestMapping(value = "/communications/{messageid}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	void updateStatus(@PathVariable("messageid") String messageid, @RequestParam("status") String status);

	@RequestMapping(value = "/communications/{messageid}", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	void delete(@PathVariable("messageid") String messageid);
}
