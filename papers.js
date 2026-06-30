// The 50 most influential papers in the history of AI / ML / CS.
// Each entry: year, title, authors, venue, icon (emoji glyph), tag, blurb, url.
const PAPERS = [
  {
    year: 1943,
    title: "A Logical Calculus of the Ideas Immanent in Nervous Activity",
    authors: "Warren S. McCulloch & Walter Pitts",
    venue: "Bulletin of Mathematical Biophysics",
    tag: "Foundations",
    blurb:
      "Introduced the first mathematical model of a neuron. By showing networks of simple binary threshold units could compute any logical function, it laid the conceptual cornerstone for artificial neural networks.",
    url: "https://doi.org/10.1007/BF02478259",
  },
  {
    year: 1948,
    title: "A Mathematical Theory of Communication",
    authors: "Claude E. Shannon",
    venue: "Bell System Technical Journal",
    tag: "Information Theory",
    blurb:
      "Founded information theory, defining entropy and the bit as the unit of information. Its measures of information and uncertainty underpin compression, coding, and the loss functions used to train modern models.",
    url: "https://doi.org/10.1002/j.1538-7305.1948.tb01338.x",
  },
  {
    year: 1950,
    title: "Computing Machinery and Intelligence",
    authors: "Alan M. Turing",
    venue: "Mind",
    tag: "Philosophy of AI",
    blurb:
      "Posed the question 'Can machines think?' and proposed the Imitation Game (the Turing Test). It framed machine intelligence as an empirical, testable idea and set the agenda for the entire field.",
    url: "https://doi.org/10.1093/mind/LIX.236.433",
  },
  {
    year: 1958,
    title: "The Perceptron: A Probabilistic Model for Information Storage and Organization",
    authors: "Frank Rosenblatt",
    venue: "Psychological Review",
    tag: "Neural Networks",
    blurb:
      "Presented the perceptron, the first trainable neural network with a learning rule. It demonstrated that a machine could learn to classify patterns from examples — the seed of supervised learning.",
    url: "https://doi.org/10.1037/h0042519",
  },
  {
    year: 1959,
    title: "Some Studies in Machine Learning Using the Game of Checkers",
    authors: "Arthur L. Samuel",
    venue: "IBM Journal of Research and Development",
    tag: "Machine Learning",
    blurb:
      "Coined the term 'machine learning' and built a checkers program that improved through self-play. An early demonstration of reinforcement-style learning and search that beat its own creator.",
    url: "https://doi.org/10.1147/rd.33.0210",
  },
  {
    year: 1965,
    title: "Fuzzy Sets",
    authors: "Lotfi A. Zadeh",
    venue: "Information and Control",
    tag: "Reasoning",
    blurb:
      "Generalized classical set theory to allow degrees of membership, enabling reasoning under vagueness. Fuzzy logic became a basis for control systems and approximate, human-like reasoning.",
    url: "https://doi.org/10.1016/S0019-9958(65)90241-X",
  },
  {
    year: 1969,
    title: "Perceptrons: An Introduction to Computational Geometry",
    authors: "Marvin Minsky & Seymour Papert",
    venue: "MIT Press",
    tag: "Neural Networks",
    blurb:
      "Rigorously analyzed the limits of single-layer perceptrons, famously the XOR problem. The critique cooled neural-net funding for a decade but motivated the multilayer networks that followed.",
    url: "https://mitpress.mit.edu/9780262630221/perceptrons/",
  },
  {
    year: 1980,
    title: "Neocognitron: A Self-Organizing Neural Network Model",
    authors: "Kunihiko Fukushima",
    venue: "Biological Cybernetics",
    tag: "Computer Vision",
    blurb:
      "A hierarchical, shift-invariant network inspired by the visual cortex. Its alternating feature and pooling layers directly prefigured the convolutional neural networks that dominate vision today.",
    url: "https://doi.org/10.1007/BF00344251",
  },
  {
    year: 1982,
    title: "Neural Networks and Physical Systems with Emergent Collective Computational Abilities",
    authors: "John J. Hopfield",
    venue: "PNAS",
    tag: "Neural Networks",
    blurb:
      "Introduced Hopfield networks — recurrent nets that store memories as energy minima. It connected neural computation to statistical physics and revived interest in associative memory.",
    url: "https://doi.org/10.1073/pnas.79.8.2554",
  },
  {
    year: 1986,
    title: "Learning Representations by Back-Propagating Errors",
    authors: "David Rumelhart, Geoffrey Hinton & Ronald Williams",
    venue: "Nature",
    tag: "Neural Networks",
    blurb:
      "Popularized backpropagation for training multilayer networks, letting hidden layers learn useful internal representations. This algorithm remains the engine behind essentially all deep learning.",
    url: "https://doi.org/10.1038/323533a0",
  },
  {
    year: 1988,
    title: "Probabilistic Reasoning in Intelligent Systems",
    authors: "Judea Pearl",
    venue: "Morgan Kaufmann",
    tag: "Reasoning",
    blurb:
      "Established Bayesian networks as a principled framework for reasoning under uncertainty. It reshaped AI around probability and later seeded the modern study of causality.",
    url: "https://www.sciencedirect.com/book/9780080514895/probabilistic-reasoning-in-intelligent-systems",
  },
  {
    year: 1989,
    title: "Approximation by Superpositions of a Sigmoidal Function",
    authors: "George Cybenko",
    venue: "Mathematics of Control, Signals and Systems",
    tag: "Theory",
    blurb:
      "Proved the universal approximation theorem: a single hidden layer with enough units can approximate any continuous function. It gave neural networks a firm theoretical justification.",
    url: "https://doi.org/10.1007/BF02551274",
  },
  {
    year: 1989,
    title: "Backpropagation Applied to Handwritten Zip Code Recognition",
    authors: "Yann LeCun et al.",
    venue: "Neural Computation",
    tag: "Computer Vision",
    blurb:
      "First end-to-end trained convolutional network applied to a real task — reading postal codes. It proved CNNs could work in practice and launched deep learning for vision.",
    url: "https://doi.org/10.1162/neco.1989.1.4.541",
  },
  {
    year: 1992,
    title: "Q-learning",
    authors: "Christopher Watkins & Peter Dayan",
    venue: "Machine Learning",
    tag: "Reinforcement Learning",
    blurb:
      "Introduced a model-free reinforcement learning algorithm with a convergence proof. Q-learning became the foundation for value-based RL, including later deep RL breakthroughs.",
    url: "https://doi.org/10.1007/BF00992698",
  },
  {
    year: 1995,
    title: "Support-Vector Networks",
    authors: "Corinna Cortes & Vladimir Vapnik",
    venue: "Machine Learning",
    tag: "Machine Learning",
    blurb:
      "Introduced support vector machines with the kernel trick and margin maximization. SVMs dominated practical ML for over a decade and grounded learning theory in generalization.",
    url: "https://doi.org/10.1007/BF00994018",
  },
  {
    year: 1997,
    title: "Long Short-Term Memory",
    authors: "Sepp Hochreiter & Jürgen Schmidhuber",
    venue: "Neural Computation",
    tag: "Sequence Models",
    blurb:
      "Solved the vanishing-gradient problem in recurrent networks with gated memory cells. LSTMs powered speech recognition, translation, and text generation for nearly two decades.",
    url: "https://doi.org/10.1162/neco.1997.9.8.1735",
  },
  {
    year: 1998,
    title: "Gradient-Based Learning Applied to Document Recognition",
    authors: "Yann LeCun, Léon Bottou, Yoshua Bengio & Patrick Haffner",
    venue: "Proceedings of the IEEE",
    tag: "Computer Vision",
    blurb:
      "Introduced LeNet-5 and the MNIST benchmark, formalizing the modern convolutional architecture. It became the canonical reference for CNNs and a template for deep vision systems.",
    url: "https://doi.org/10.1109/5.726791",
  },
  {
    year: 2001,
    title: "Random Forests",
    authors: "Leo Breiman",
    venue: "Machine Learning",
    tag: "Machine Learning",
    blurb:
      "Combined many decorrelated decision trees into a robust, accurate ensemble. Random forests became one of the most widely used and reliable off-the-shelf learning methods.",
    url: "https://doi.org/10.1023/A:1010933404324",
  },
  {
    year: 2003,
    title: "A Neural Probabilistic Language Model",
    authors: "Yoshua Bengio, Réjean Ducharme, Pascal Vincent & Christian Jauvin",
    venue: "JMLR",
    tag: "NLP",
    blurb:
      "Learned distributed word representations and predicted text with a neural network, beating n-gram models. It pioneered word embeddings and neural language modeling.",
    url: "https://jmlr.org/papers/v3/bengio03a.html",
  },
  {
    year: 2006,
    title: "A Fast Learning Algorithm for Deep Belief Nets",
    authors: "Geoffrey Hinton, Simon Osindero & Yee-Whye Teh",
    venue: "Neural Computation",
    tag: "Deep Learning",
    blurb:
      "Showed deep networks could be trained via greedy layer-wise pretraining. Widely credited with sparking the 'deep learning' renaissance and the term itself.",
    url: "https://doi.org/10.1162/neco.2006.18.7.1527",
  },
  {
    year: 2009,
    title: "ImageNet: A Large-Scale Hierarchical Image Database",
    authors: "Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li & Fei-Fei Li",
    venue: "CVPR",
    tag: "Datasets",
    blurb:
      "Created a dataset of millions of labeled images across thousands of categories. The ensuing ILSVRC competition became the proving ground that triggered the deep learning era.",
    url: "https://doi.org/10.1109/CVPR.2009.5206848",
  },
  {
    year: 2012,
    title: "ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)",
    authors: "Alex Krizhevsky, Ilya Sutskever & Geoffrey Hinton",
    venue: "NeurIPS",
    tag: "Computer Vision",
    blurb:
      "Crushed the ImageNet benchmark using a deep GPU-trained CNN with ReLUs and dropout. This result ignited the modern deep learning revolution across industry and academia.",
    url: "https://doi.org/10.1145/3065386",
  },
  {
    year: 2013,
    title: "Efficient Estimation of Word Representations in Vector Space (Word2Vec)",
    authors: "Tomas Mikolov, Kai Chen, Greg Corrado & Jeffrey Dean",
    venue: "ICLR Workshop",
    tag: "NLP",
    blurb:
      "Introduced fast skip-gram and CBOW models that learn semantic word vectors with arithmetic structure (king − man + woman ≈ queen). Word embeddings became a staple of NLP.",
    url: "https://arxiv.org/abs/1301.3781",
  },
  {
    year: 2013,
    title: "Playing Atari with Deep Reinforcement Learning",
    authors: "Volodymyr Mnih et al. (DeepMind)",
    venue: "NeurIPS Workshop",
    tag: "Reinforcement Learning",
    blurb:
      "Combined Q-learning with deep CNNs to learn Atari games directly from pixels. The Deep Q-Network proved deep RL could master complex control from raw sensory input.",
    url: "https://arxiv.org/abs/1312.5602",
  },
  {
    year: 2014,
    title: "Generative Adversarial Networks",
    authors: "Ian Goodfellow et al.",
    venue: "NeurIPS",
    tag: "Generative Models",
    blurb:
      "Pitted a generator against a discriminator in a minimax game to synthesize realistic data. GANs launched the modern wave of generative AI for images and beyond.",
    url: "https://arxiv.org/abs/1406.2661",
  },
  {
    year: 2014,
    title: "Auto-Encoding Variational Bayes",
    authors: "Diederik P. Kingma & Max Welling",
    venue: "ICLR",
    tag: "Generative Models",
    blurb:
      "Introduced the variational autoencoder and the reparameterization trick for scalable latent-variable learning. VAEs became a foundational tool for deep generative modeling.",
    url: "https://arxiv.org/abs/1312.6114",
  },
  {
    year: 2014,
    title: "Sequence to Sequence Learning with Neural Networks",
    authors: "Ilya Sutskever, Oriol Vinyals & Quoc V. Le",
    venue: "NeurIPS",
    tag: "NLP",
    blurb:
      "Used encoder–decoder LSTMs to map input sequences to output sequences end-to-end. It established the seq2seq paradigm that powered neural machine translation.",
    url: "https://arxiv.org/abs/1409.3215",
  },
  {
    year: 2014,
    title: "Neural Machine Translation by Jointly Learning to Align and Translate",
    authors: "Dzmitry Bahdanau, Kyunghyun Cho & Yoshua Bengio",
    venue: "ICLR 2015",
    tag: "NLP",
    blurb:
      "Introduced the attention mechanism, letting models focus on relevant input words while decoding. Attention dramatically improved translation and became the heart of the Transformer.",
    url: "https://arxiv.org/abs/1409.0473",
  },
  {
    year: 2014,
    title: "Dropout: A Simple Way to Prevent Neural Networks from Overfitting",
    authors: "Nitish Srivastava et al.",
    venue: "JMLR",
    tag: "Deep Learning",
    blurb:
      "Randomly dropping units during training acts as powerful regularization and implicit ensembling. Dropout became a default technique for training robust deep networks.",
    url: "https://jmlr.org/papers/v15/srivastava14a.html",
  },
  {
    year: 2015,
    title: "Adam: A Method for Stochastic Optimization",
    authors: "Diederik P. Kingma & Jimmy Ba",
    venue: "ICLR",
    tag: "Optimization",
    blurb:
      "An adaptive-moment optimizer that is robust and easy to tune. Adam became the default optimizer for training the vast majority of deep learning models.",
    url: "https://arxiv.org/abs/1412.6980",
  },
  {
    year: 2015,
    title: "Batch Normalization",
    authors: "Sergey Ioffe & Christian Szegedy",
    venue: "ICML",
    tag: "Deep Learning",
    blurb:
      "Normalized layer activations to stabilize and accelerate training of deep networks. BatchNorm enabled much deeper architectures and faster convergence.",
    url: "https://arxiv.org/abs/1502.03167",
  },
  {
    year: 2015,
    title: "Deep Residual Learning for Image Recognition (ResNet)",
    authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren & Jian Sun",
    venue: "CVPR 2016",
    tag: "Computer Vision",
    blurb:
      "Introduced skip connections that let networks grow to hundreds of layers without degradation. Residual learning is now ubiquitous, including inside Transformers.",
    url: "https://arxiv.org/abs/1512.03385",
  },
  {
    year: 2015,
    title: "U-Net: Convolutional Networks for Biomedical Image Segmentation",
    authors: "Olaf Ronneberger, Philipp Fischer & Thomas Brox",
    venue: "MICCAI",
    tag: "Computer Vision",
    blurb:
      "An encoder–decoder with skip connections that excels at dense pixel-wise prediction from little data. U-Net became the backbone of segmentation and modern diffusion models.",
    url: "https://arxiv.org/abs/1505.04597",
  },
  {
    year: 2015,
    title: "Human-Level Control Through Deep Reinforcement Learning",
    authors: "Volodymyr Mnih et al. (DeepMind)",
    venue: "Nature",
    tag: "Reinforcement Learning",
    blurb:
      "The full DQN system with experience replay and target networks reached human-level play on dozens of Atari games. It validated deep RL as a general learning approach.",
    url: "https://doi.org/10.1038/nature14236",
  },
  {
    year: 2016,
    title: "Mastering the Game of Go with Deep Neural Networks and Tree Search",
    authors: "David Silver et al. (DeepMind)",
    venue: "Nature",
    tag: "Reinforcement Learning",
    blurb:
      "AlphaGo combined deep networks with Monte Carlo tree search to defeat a world Go champion. A landmark moment showing AI could master intuition-heavy strategic domains.",
    url: "https://doi.org/10.1038/nature16961",
  },
  {
    year: 2017,
    title: "Proximal Policy Optimization Algorithms",
    authors: "John Schulman et al. (OpenAI)",
    venue: "arXiv",
    tag: "Reinforcement Learning",
    blurb:
      "A stable, simple-to-implement policy-gradient method that became the workhorse of modern RL — and later the optimization core of RLHF for aligning language models.",
    url: "https://arxiv.org/abs/1707.06347",
  },
  {
    year: 2017,
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani et al. (Google)",
    venue: "NeurIPS",
    tag: "Transformers",
    blurb:
      "Introduced the Transformer, replacing recurrence entirely with self-attention. It is the single most important architecture behind today's large language and multimodal models.",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    year: 2018,
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee & Kristina Toutanova",
    venue: "NAACL 2019",
    tag: "NLP",
    blurb:
      "Pretrained a bidirectional Transformer with masked language modeling, then fine-tuned it everywhere. BERT set the pretrain-then-finetune template for modern NLP.",
    url: "https://arxiv.org/abs/1810.04805",
  },
  {
    year: 2018,
    title: "Improving Language Understanding by Generative Pre-Training (GPT)",
    authors: "Alec Radford, Karthik Narasimhan, Tim Salimans & Ilya Sutskever",
    venue: "OpenAI",
    tag: "Large Language Models",
    blurb:
      "Showed that generative pretraining of a Transformer decoder yields strong, transferable language understanding. It began the GPT lineage that defines modern LLMs.",
    url: "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf",
  },
  {
    year: 2019,
    title: "Language Models are Unsupervised Multitask Learners (GPT-2)",
    authors: "Alec Radford et al. (OpenAI)",
    venue: "OpenAI",
    tag: "Large Language Models",
    blurb:
      "Demonstrated that scaling a language model yields surprising zero-shot abilities across tasks. GPT-2's fluency made large-scale generative text a mainstream concern.",
    url: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf",
  },
  {
    year: 2020,
    title: "Language Models are Few-Shot Learners (GPT-3)",
    authors: "Tom Brown et al. (OpenAI)",
    venue: "NeurIPS",
    tag: "Large Language Models",
    blurb:
      "A 175-billion-parameter model that performs new tasks from a few in-context examples, no fine-tuning. It revealed in-context learning and kicked off the LLM era at scale.",
    url: "https://arxiv.org/abs/2005.14165",
  },
  {
    year: 2020,
    title: "Denoising Diffusion Probabilistic Models",
    authors: "Jonathan Ho, Ajay Jain & Pieter Abbeel",
    venue: "NeurIPS",
    tag: "Generative Models",
    blurb:
      "Reframed generation as iteratively denoising random noise, producing exceptional image quality. Diffusion models now power leading text-to-image and video systems.",
    url: "https://arxiv.org/abs/2006.11239",
  },
  {
    year: 2020,
    title: "An Image is Worth 16x16 Words: Transformers for Image Recognition (ViT)",
    authors: "Alexey Dosovitskiy et al. (Google)",
    venue: "ICLR 2021",
    tag: "Computer Vision",
    blurb:
      "Applied a pure Transformer to image patches and matched or beat CNNs at scale. The Vision Transformer unified vision and language under one architecture.",
    url: "https://arxiv.org/abs/2010.11929",
  },
  {
    year: 2021,
    title: "Learning Transferable Visual Models from Natural Language Supervision (CLIP)",
    authors: "Alec Radford et al. (OpenAI)",
    venue: "ICML",
    tag: "Multimodal",
    blurb:
      "Trained image and text encoders jointly on web-scale pairs to enable open-vocabulary zero-shot recognition. CLIP became the bridge connecting vision and language in generative AI.",
    url: "https://arxiv.org/abs/2103.00020",
  },
  {
    year: 2021,
    title: "Highly Accurate Protein Structure Prediction with AlphaFold",
    authors: "John Jumper et al. (DeepMind)",
    venue: "Nature",
    tag: "AI for Science",
    blurb:
      "Solved the 50-year grand challenge of predicting 3D protein structure from sequence with near-experimental accuracy. A transformative demonstration of AI advancing fundamental science.",
    url: "https://doi.org/10.1038/s41586-021-03819-2",
  },
  {
    year: 2022,
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    authors: "Robin Rombach et al.",
    venue: "CVPR",
    tag: "Generative Models",
    blurb:
      "Ran diffusion in a compressed latent space, making high-quality text-to-image generation efficient and open. This work became Stable Diffusion, democratizing generative imaging.",
    url: "https://arxiv.org/abs/2112.10752",
  },
  {
    year: 2022,
    title: "Training Language Models to Follow Instructions with Human Feedback (InstructGPT)",
    authors: "Long Ouyang et al. (OpenAI)",
    venue: "NeurIPS",
    tag: "Alignment",
    blurb:
      "Used reinforcement learning from human feedback (RLHF) to align LLMs with user intent. This recipe made models helpful and safe enough for products like ChatGPT.",
    url: "https://arxiv.org/abs/2203.02155",
  },
  {
    year: 2022,
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: "Jason Wei et al. (Google)",
    venue: "NeurIPS",
    tag: "Reasoning",
    blurb:
      "Showed that prompting models to reason step by step unlocks dramatically better performance on hard problems. It reshaped how we elicit reasoning and inspired modern reasoning models.",
    url: "https://arxiv.org/abs/2201.11903",
  },
  {
    year: 2022,
    title: "Training Compute-Optimal Large Language Models (Chinchilla)",
    authors: "Jordan Hoffmann et al. (DeepMind)",
    venue: "NeurIPS",
    tag: "Scaling Laws",
    blurb:
      "Showed models were undertrained and that data and parameters should scale together. The Chinchilla scaling laws reshaped how every modern LLM is sized and trained.",
    url: "https://arxiv.org/abs/2203.15556",
  },
  {
    year: 2023,
    title: "LLaMA: Open and Efficient Foundation Language Models",
    authors: "Hugo Touvron et al. (Meta)",
    venue: "arXiv",
    tag: "Large Language Models",
    blurb:
      "Released strong, efficient open foundation models that rival far larger ones. LLaMA catalyzed the open-source LLM ecosystem and a wave of community innovation.",
    url: "https://arxiv.org/abs/2302.13971",
  },
];
