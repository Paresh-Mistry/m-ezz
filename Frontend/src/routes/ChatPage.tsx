import { Copy, Check, Plus, UserCircle, ArrowUp, Loader } from 'lucide-react';
import React, { useRef, useEffect, useState, useContext } from 'react';
import Layoutwrap from '../Layout/Layoutwrap';
import { context } from '../Layout/Context';
import PdfDocument from '../components/Pdf';

const ChatPage: React.FC = () => {

    const [messages, setMessages] = useState<{ role: string; content: string; timestamp: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [typingResponse, setTypingResponse] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [copiedState, setCopiedState] = useState<{ [key: number]: boolean }>({});

    const { theme } = useContext(context)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCopy = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedState((prev) => ({ ...prev, [index]: true }));

            setTimeout(() => {
                setCopiedState((prev) => ({ ...prev, [index]: false }));
            }, 2000); // Reset after 2s
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const simulateTyping = (text: string) => {
        let i = 0;
        setTypingResponse('');
        const interval = setInterval(() => {
            if (i < text.length) {
                setTypingResponse((prev) => prev + text[i]);
                i++;
            } else {
                clearInterval(interval);
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: text, timestamp: new Date().toLocaleTimeString() },
                ]);
                setTypingResponse('');
                setIsLoading(false);
            }
        }, 5); // Increased speed by reducing interval time
    };


    useEffect(() => {
        document.title = 'Ask AI';
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, typingResponse]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setMessages([
            ...messages,
            { role: 'user', content: inputValue, timestamp: new Date().toLocaleTimeString() },
        ]);
        setInputValue('');
        setIsLoading(true);

        setTimeout(() => {
            simulateTyping(`This is a simulated response to Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laborum rem deleniti ea eveniet magni explicabo magnam laboriosam, ipsam nulla voluptate dolorem placeat enim nam illo aspernatur id. Ipsa, vitae id molestiae dignissimos ad soluta. Ut eligendi saepe perferendis iusto, delectus commodi. Eveniet dignissimos magnam dicta minima fuga explicabo mollitia. Vitae quaerat nesciunt amet, est laborum mollitia eius nobis dolore culpa voluptas veniam praesentium repellat eos soluta, velit iste beatae doloremque ex ipsam impedit numquam magni commodi? Sint, dignissimos asperiores ipsa similique vitae, sapiente cumque tenetur atque nihil deleniti corporis suscipit, deserunt mollitia! Autem esse cumque, cum inventore eligendi repellat sed sunt itaque nobis consectetur voluptatum est, quos alias voluptates voluptatibus exercitationem harum atque dolore perferendis id? Quod, molestiae aperiam similique rem quisquam veritatis laudantium enim ratione asperiores, sunt in architecto maxime eveniet autem quaerat ea minus reprehenderit eum numquam. Quam, voluptatum animi. Sit natus repellendus minima est rerum sunt, libero omnis perferendis temporibus quos iusto ut ullam voluptates cum possimus mollitia labore. Iste reprehenderit nisi dolorum molestias eum suscipit esse dolores, tempore earum voluptas neque doloremque recusandae aut placeat, dicta fugiat error, commodi ipsa quos corrupti mollitia harum. Odit iusto quis reiciendis itaque voluptates, quaerat asperiores dolores incidunt nesciunt aspernatur sapiente reprehenderit, eum, minus iure doloremque ratione voluptas perferendis natus minima quam! Excepturi totam ullam sit tempora, ipsam sapiente nostrum alias. Similique expedita repellat molestiae saepe. Sequi deserunt quaerat placeat animi excepturi perferendis? Explicabo blanditiis neque labore placeat doloremque dolore, nostrum, earum minima, ullam nobis officiis eaque? Optio fuga, mollitia maiores nobis, ullam sit vitae cupiditate ab quo saepe eligendi quis! Cupiditate quas aliquam veritatis officiis accusantium, quod amet. Pariatur officiis recusandae asperiores numquam, delectus nostrum laboriosam quam. Distinctio cum quisquam vitae hic consequuntur dolores explicabo debitis voluptates nulla id aliquam aperiam repellendus vel, nostrum, iure architecto rem temporibus?: "${inputValue}".`);
        }, 500);
    };

    return (
        <React.Fragment>
            <Layoutwrap>
                <div className="flex flex-col flex-grow items-center h-screen">
                    {messages.length > 0 && <nav className={`p-4 w-full border-b ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
                        <div className="container mx-auto flex justify-between items-center">
                            <a href="#" className="text-xs font-semibold flex gap-1 items-center">paresh@mail.com</a>
                            <PdfDocument messages={messages} />
                        </div>
                    </nav>}
                    <div className={`flex-1 w-full px-4 overflow-y-auto ${messages.length && 'md:py-4'}`}>
                        {!messages.length && (
                            <div className="min-h-screen max-w-2xl mx-auto text-center flex flex-col items-center justify-center w-full space-y-3">
                                <h1 className={`text-2xl font-display md:text-4xl`}>
                                    What do you want to know ?
                                </h1>
                            </div>
                        )}
                        <div
                            className={`max-w-3xl mx-auto space-y-4 md:space-y-8 md:mt-0 mt-2 ${messages.length && 'mb-32 md:mb-38'
                                }`}
                        >
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === 'user'
                                        ? 'justify-start font-bold text-2xl text-gray-600'
                                        : 'justify-start'
                                        }`}
                                >
                                    {message.role === 'assistant' ? (
                                        <div className="border-gray-300 px-4 md:px-4 w-full">
                                            <h3 className="font-semibold text-md underline flex gap-2 items-center underline-offset-13">
                                                <Loader size={15} className='inline-flex mt-1' /> Answer
                                            </h3>
                                            <p className={`${theme === "dark" ? "text-gray-400 border-gray-800" : "text-gray-800 border-gray-400"} tracking-wider font-semibold mt-2 border-t md:pt-6 pt-4 mb-4`}>
                                                {message.content.charAt(0).toUpperCase() +
                                                    message.content.slice(1).toLowerCase()}
                                            </p>
                                            <div
                                                className="flex justify-between items-center"
                                                onClick={() => handleCopy(message.content, index)}
                                            >
                                                <span className="flex items-center gap-1 text-gray-600">
                                                    {copiedState[index] ? (
                                                        <>
                                                            <Check size={18} className="text-green-700" />
                                                            <span className="text-green-700">Copied!</span>
                                                        </>
                                                    ) : (
                                                        <Copy size={15} />
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`px-2 py-2 flex gap-x-0.5 ${message.content.length > 20 && 'items-start' || 'items-center'} w-full justify-start space-x-1.5`}>
                                            <span>{message.content && <UserCircle size={30} />}</span>
                                            <span className="text-xl font-extrabold tracking-wider md:text-3xl">{message.content.charAt(0).toUpperCase() + message.content.slice(1).toLowerCase()}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="border-gray-300 px-4 md:px-4 w-full">
                                        <h3 className="font-semibold text-md underline flex gap-2 items-center underline-offset-13">
                                            <Loader size={15} className='inline-flex mt-1 animate-[spin_0.8s_linear_infinite]' /> Answer
                                        </h3>
                                        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-800"} mt-2 border-t tracking-wider	font-semibold border-gray-400 pt-3 mb-4`}>
                                            {typingResponse}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="fixed bottom-0 mx-auto w-full lg:max-w-3xl md:max-w-2xl sm:max-w-xl  py-3 px-2 md:px-0">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Type your message here..."
                                className={`flex-grow shadow-sm p-3 md:p-4 md:pl-14 pl-13 md:pr-24 pr-24 ${theme === "dark" ? "bg-[#1E1E1E] border border-gray-700" : "bg-white border border-gray-400"} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                            <button className={`absolute left-0 bg-gray-300 shrink-0 p-1  md:p-1 rounded-full my-3 mx-4 text-gray-600`}>
                                <Plus size={18} />
                            </button>
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isLoading}
                                className={`absolute right-4 shrink-0 bg-gray-200 p-1 rounded-full ${!inputValue.trim()}`}
                            >
                                <ArrowUp size={18} className='text-gray-800' />
                            </button>
                        </div>
                        <div>
                            <p className="text-xs text-center pt-1">M-Ezz can make mistakes. Check important info.</p>
                        </div>
                    </form>
                </div>
            </Layoutwrap>
        </React.Fragment>
    );
};

export default ChatPage;
